import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useWindow } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';
import StartMenu from './StartMenu';
import NotificationsPanel from './NotificationsPanel';

export default function Taskbar({ windows, onOpenWindow, onMinimizeWindow }) {
  const { focusWindow, minimizeWindow } = useWindow();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
  const [showDesktop, setShowDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const pinnedApps = [
    { id: 'about', label: 'About Me', iconSrc: '/icons/about.svg' },
    { id: 'projects', label: 'Projects', iconSrc: '/icons/projects.svg' },
    { id: 'skills', label: 'Skills', iconSrc: '/icons/skills.svg' },
    { id: 'contact', label: 'Contact', iconSrc: '/icons/contact.svg' },
    { id: 'terminal', label: 'Terminal', iconSrc: '/icons/terminal.svg' },
  ];


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = pinnedApps.filter(app =>
      app.label.toLowerCase().includes(query)
    );
    setSearchResults(results);
  }, [searchQuery]);

  const handleAppClick = (appId) => {
    const existingWindow = windows.find((w) => w.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        minimizeWindow(appId);
      } else {
        focusWindow(appId);
      }
    } else {
      onOpenWindow(appId);
    }
  };

  const handleWindowClick = (windowId) => {
    const window = windows.find((w) => w.id === windowId);
    if (window) {
      if (window.isMinimized) {
        minimizeWindow(windowId);
      } else {
        minimizeWindow(windowId);
      }
    }
  };

  const activeWindows = windows.filter((w) => !w.isMinimized);

  const taskbarStyle = {
    backgroundImage: `url('/images/taskbar-bg.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <>
      {/* Taskbar */}
      <div style={taskbarStyle} className={`absolute bottom-0 left-0 right-0 h-14 backdrop-blur-xl flex items-center justify-between px-3 gap-2 z-30 ${isDarkMode ? 'bg-transparent border-t border-white/10 text-slate-300' : 'bg-transparent border-t border-black/10 text-black'}`}>
        {/* Left: Start Menu & Pinned Apps */}
        <div className="flex items-center gap-1">
          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors group"
            title="Start Menu"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🪟</span>
          </motion.button>

          {!isMobile && (
            <>
              {/* Separator */}
              <div className="h-6 w-px bg-white/10 mx-1" />

              {/* Pinned Apps */}
              <div className="flex gap-1">
                {pinnedApps.map((app) => {
                  const isActive = windows.some((w) => w.id === app.id && !w.isMinimized);
                  const isOpen = windows.some((w) => w.id === app.id);
                  return (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppClick(app.id)}
                      className={`flex items-center justify-center h-10 w-10 rounded transition-all relative ${
                        isActive
                          ? 'bg-blue-500/30 border border-blue-500/50'
                          : isOpen
                          ? 'bg-slate-700/30 hover:bg-slate-700/50'
                          : 'hover:bg-white/10'
                      }`}
                      title={app.label}
                    >
                      {app.iconSrc ? (
                        <img src={app.iconSrc} alt={app.label} className="h-6 w-6" />
                      ) : (
                        <span className="text-lg">{app.icon}</span>
                      )}
                      {isActive && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-400" />}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Center: Search Bar & Open Windows */}
        <div className="flex gap-2 flex-1 mx-2 items-center">
          {/* Search Bar */}
          <div className="relative">
            <motion.div
              animate={{ width: showSearch ? 200 : 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-colors ${
                showSearch
                  ? isDarkMode
                    ? 'bg-slate-800/50 border-blue-500/50'
                    : 'bg-white/30 border-blue-500/50'
                  : isDarkMode
                  ? 'bg-slate-800/30 border-white/10 hover:bg-slate-800/50'
                  : 'bg-white/10 border-black/10 hover:bg-white/20'
              }`}
            >
              {showSearch ? (
                <>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setShowSearch(false);
                        setSearchQuery('');
                      }
                    }}
                    className={`bg-transparent outline-none text-sm w-full ${isDarkMode ? 'text-white placeholder-slate-400' : 'text-black placeholder-slate-600'}`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className={`text-sm ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}
                  >
                    ✕
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowSearch(true)}
                  className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                  title="Search"
                >
                  🔍
                </motion.button>
              )}
            </motion.div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearch && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`absolute top-full mt-1 left-0 w-48 rounded-lg border shadow-2xl z-[9999] max-h-72 overflow-y-auto ${
                    isDarkMode
                      ? 'bg-slate-800/95 border-white/20'
                      : 'bg-white/95 border-black/20'
                  }`}
                >
                  {searchResults.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ x: 4, backgroundColor: isDarkMode ? 'rgba(100,116,139,0.5)' : 'rgba(226,232,240,0.5)' }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleAppClick(app.id);
                        setShowSearch(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                        isDarkMode
                          ? 'text-slate-300'
                          : 'text-black'
                      } border-b border-white/10 last:border-b-0`}
                    >
                      <img
                        src={app.iconSrc}
                        alt={app.label}
                        className="h-5 w-5"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div>
                        <p className="font-medium">{app.label}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                          App
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Open Windows (Minimized & Active) */}
          <div className="flex gap-1 flex-1 overflow-x-auto">
            {windows.map((w) => (
              <motion.button
                key={w.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleWindowClick(w.id)}
                className={`px-3 py-1 text-base rounded transition-colors border border-white/10 whitespace-nowrap flex-shrink-0 relative ${
                  w.isMinimized
                    ? isDarkMode ? 'bg-slate-800/30 text-slate-400 hover:bg-slate-800/50' : 'bg-slate-300/30 text-black hover:bg-slate-300/50'
                    : isDarkMode ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-800' : 'bg-slate-200/50 text-black hover:bg-slate-200'
                }`}
                title={`${w.title} - Click to ${w.isMinimized ? 'restore' : 'minimize'}`}
              >
                {w.icon} {w.title.split('.')[0]}
                {!w.isMinimized && <span className="ml-2 h-1 w-1 rounded-full bg-blue-400 inline-block" />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors relative"
            title="Notifications"
          >
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </motion.button>

          {/* Wi-Fi Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors cursor-help"
            title="Network Connected"
          >
            <span className="text-lg">📶</span>
          </motion.div>

          {/* Battery Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors cursor-help"
            title="Battery: 100%"
          >
            <span className="text-lg">🔋</span>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors"
            title="Toggle Theme"
            aria-label="Toggle light or dark theme"
          >
            <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
          </motion.button>

          {/* Clock & Date */}
          <div className={`px-3 py-1 text-base font-medium flex flex-col items-end border-l border-white/10 pl-3 ${
            isDarkMode ? 'text-slate-400' : 'text-black'
          }`}>
            <span>{time}</span>
            <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-black'}`}>{date}</span>
          </div>

          {/* Show Desktop Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowDesktop(true)}
            onMouseLeave={() => setShowDesktop(false)}
            className="flex items-center justify-center h-10 w-1 rounded-l hover:bg-white/10 transition-colors hover:w-10"
            title="Show Desktop"
          >
            {showDesktop && <span className="text-xs">⊞</span>}
          </motion.button>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu
        isOpen={showStartMenu}
        onClose={() => setShowStartMenu(false)}
        onAppClick={handleAppClick}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
