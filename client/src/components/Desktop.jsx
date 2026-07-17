import { useState, Suspense, lazy, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import Taskbar from './Taskbar';
import AppSkeleton from './AppSkeleton';

// Lazy load app components for better performance
const AboutApp = lazy(() => import('./apps/AboutApp'));
const SkillsApp = lazy(() => import('./apps/SkillsApp'));
const ProjectsApp = lazy(() => import('./apps/ProjectsApp'));
const ResumeApp = lazy(() => import('./apps/ResumeApp'));
const ContactApp = lazy(() => import('./apps/ContactApp'));
const TerminalApp = lazy(() => import('./apps/TerminalApp'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

import { WALLPAPERS, DEFAULT_DESKTOP_WALLPAPER } from '../config/wallpapers';

const createImageIcon = (src) => (
  <img src={src} alt="" className="h-8 w-8 rounded-lg object-cover" />
);

const DESKTOP_ICONS = [
  {
    id: 'about',
    label: 'About Me',
    icon: createImageIcon('/icons/about.svg'),
    type: 'about',
    content: AboutApp,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: createImageIcon('/icons/projects.svg'),
    type: 'projects',
    content: ProjectsApp,
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: createImageIcon('/icons/skills.svg'),
    type: 'skills',
    content: SkillsApp,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: createImageIcon('/icons/contact.svg'),
    type: 'contact',
    content: ContactApp,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: createImageIcon('/icons/resume.svg'),
    type: 'resume',
    content: ResumeApp,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: createImageIcon('/icons/terminal.svg'),
    type: 'terminal',
    content: TerminalApp,
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: createImageIcon('/icons/admin.svg'),
    type: 'admin',
    content: AdminApp,
    hidden: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: createImageIcon('/icons/github.svg'),
    type: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: createImageIcon('/icons/linkedin.svg'),
    type: 'linkedin',
  },
];

export default function Desktop() {
  const { windows, openWindow, minimizeWindow, focusWindow } = useWindow();
  const { isDarkMode } = useTheme();
  const [contextMenu, setContextMenu] = useState(null);
  const [currentWallpaper, setCurrentWallpaper] = useState(DEFAULT_DESKTOP_WALLPAPER);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
    setShowPersonalize(false);
  };

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleIconDoubleClick = (icon) => {
  if (icon.type === 'github') {
    window.open('https://github.com/olaleyeelizabeth11-lab/', '_blank');
    return;
  }
  if (icon.type === 'linkedin') {
    window.open('https://www.linkedin.com/in/elizabeth-olaleye-1b6102382/', '_blank');
    return;
  }
  openWindow(icon.id, icon.label, icon.type, icon.icon);
};

  const handleWallpaperChange = (wallpaper) => {
    setCurrentWallpaper(wallpaper);
    setShowPersonalize(false);
    try {
      localStorage.setItem('desktop-wallpaper', JSON.stringify(wallpaper));
    } catch (err) {}
  };

  // Load persisted wallpaper
  useEffect(() => {
    try {
      const saved = localStorage.getItem('desktop-wallpaper');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentWallpaper(parsed);
      }
    } catch (err) {}
  }, []);

  const contextMenuItems = [
    {
      label: 'View',
      icon: '👁️',
      onClick: () => {},
    },
    {
      label: 'Refresh',
      icon: '🔄',
      onClick: () => window.location.reload(),
    },
    {
      label: 'Personalize',
      icon: '🎨',
      onClick: () => setShowPersonalize(!showPersonalize),
    },
  ];

  const backgroundStyle = currentWallpaper.type === 'gradient'
    ? (isDarkMode
      ? { backgroundImage: `radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(129,140,248,0.16), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)` }
      : { backgroundImage: `radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 25%), radial-gradient(circle at bottom right, rgba(129,140,248,0.12), transparent 30%), linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #f1f5f9 100%)` }
    )
    : { backgroundImage: `url(${currentWallpaper.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={backgroundStyle}
      onContextMenu={handleDesktopRightClick}
      onClick={(e) => setContextMenu(null)}
    >
      {/* Overlay for better text visibility */}
      <div className={isDarkMode ? 'absolute inset-0 bg-slate-950/20 pointer-events-none' : 'absolute inset-0 bg-white/20 pointer-events-none'} />

      {/* Animated background elements (only for gradient wallpaper) */}
      {currentWallpaper.type === 'gradient' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* Desktop Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Icons Grid */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 gap-6 w-fit">
            {DESKTOP_ICONS.filter((icon) => !icon.hidden).map((icon) => (
              <DesktopIcon
                key={icon.id}
                icon={icon.icon}
                label={icon.label}
                onDoubleClick={() => handleIconDoubleClick(icon)}
                onClick={isMobile ? () => handleIconDoubleClick(icon) : undefined}
              />
            ))}
          </div>
        </div>

        {/* Taskbar */}
        <Taskbar 
          windows={windows} 
          onOpenWindow={(id) => {
            const icon = DESKTOP_ICONS.find((i) => i.id === id);
            if (icon) openWindow(id, icon.label, icon.type, icon.icon);
          }}
          onMinimizeWindow={(id) => minimizeWindow(id)}
        />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((w, idx) => {
          const icon = DESKTOP_ICONS.find((i) => i.id === w.id);
          const ContentComponent = icon?.content;

          return (
            <Window key={w.id} windowData={w} isMobile={isMobile}>
              <Suspense fallback={<AppSkeleton />}>
                {ContentComponent && <ContentComponent />}
              </Suspense>
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Context Menu */}
      <ContextMenu
        position={contextMenu}
        items={contextMenuItems}
        onClose={(e) => setContextMenu(null)}
      />

      {/* Personalize Panel */}
      {showPersonalize && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPersonalize(false)}
        />
      )}
      <AnimatePresence>
        {showPersonalize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-20 left-6 z-50 w-96 rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-800/50 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-white">🎨 Personalize</h3>
              <button
                onClick={() => setShowPersonalize(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* Wallpaper Grid */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase">Wallpapers</p>
              <div className="grid grid-cols-2 gap-3">
                {WALLPAPERS.desktop.map((wallpaper) => (
                  <motion.button
                    key={wallpaper.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWallpaperChange(wallpaper)}
                    className={`relative rounded-lg overflow-hidden h-24 border-2 transition-all ${
                      currentWallpaper.id === wallpaper.id
                        ? 'border-blue-500 shadow-lg shadow-blue-500/50'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {wallpaper.type === 'gradient' ? (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, rgb(15, 23, 42), rgb(15, 23, 42), rgb(2, 6, 23))`,
                        }}
                      />
                    ) : (
                      <img
                        src={wallpaper.value}
                        alt={wallpaper.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white text-center px-2">
                        {wallpaper.name}
                      </span>
                    </div>
                    {currentWallpaper.id === wallpaper.id && (
                      <div className="absolute top-1 right-1 text-blue-300 text-lg">✓</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
