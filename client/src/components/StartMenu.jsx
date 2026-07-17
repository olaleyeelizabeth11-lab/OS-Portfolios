import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const APPS = [
  { id: 'about', label: 'About Me', icon: '/icons/about.svg', color: 'from-blue-500 to-cyan-500' },
  { id: 'projects', label: 'Projects', icon: '/icons/projects.svg', color: 'from-purple-500 to-pink-500' },
  { id: 'skills', label: 'Skills', icon: '/icons/skills.svg', color: 'from-yellow-500 to-orange-500' },
  { id: 'contact', label: 'Contact', icon: '/icons/contact.svg', color: 'from-green-500 to-emerald-500' },
  { id: 'resume', label: 'Resume', icon: '/icons/resume.svg', color: 'from-red-500 to-rose-500' },
  { id: 'terminal', label: 'Terminal', icon: '/icons/terminal.svg', color: 'from-slate-600 to-slate-700' },
];

const SHUTDOWN_MESSAGES = [
  '😴 Powering down...', '👋 See you later!', '🌙 Time to sleep',
  '⚡ Shutting down', '🖥️ Goodbye!', '🔌 Powering off',
];

const FALLBACK_PROJECTS = [
  { id: 'job-recruitment', title: 'Job Recruitment Portal', icon: '💼', description: 'Full stack recruitment platform' },
  { id: 'nigerian-foods', title: 'Nigerian Foods App', icon: '🍲', description: 'Real-time food search app' },
  { id: 'ambulance-dispatch', title: 'Ambulance Dispatch UI', icon: '🚑', description: 'Emergency response system' },
  { id: 'catering-landing', title: 'Catering Landing Page', icon: '🍽️', description: 'Restaurant service website' },
];

export default function StartMenu({ isOpen, onClose, onAppClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [shutdownMessage, setShutdownMessage] = useState('');
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await fetch('https://os-portfolios.onrender.com/api/projects?featured=true');
        if (response.ok) {
          const data = await response.json();
          if (data.projects?.length > 0) setProjects(data.projects);
        }
      } catch (error) {
        // keep fallback
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [isOpen]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) setSearchQuery('');
  }, [isOpen]);

  const filteredApps = APPS.filter(app =>
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (appId) => {
    onAppClick(appId);
    onClose();
  };

  const handlePowerButton = () => {
    setShutdownMessage(SHUTDOWN_MESSAGES[Math.floor(Math.random() * SHUTDOWN_MESSAGES.length)]);
    setIsShuttingDown(true);
    setTimeout(() => {
      setIsShuttingDown(false);
      setSearchQuery('');
      onClose();
    }, 3000);
  };

  const isMobile = window.innerWidth < 640;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Shutdown Screen */}
          <AnimatePresence>
            {isShuttingDown && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4 inline-block">
                    ⏻
                  </motion.div>
                  <p className="text-2xl text-white font-light tracking-wider">{shutdownMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
            className={`
              fixed z-50 rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl
              overflow-y-auto
              ${isMobile
                ? 'bottom-14 left-2 right-2 max-h-[75vh] p-4'
                : 'bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xl p-6 max-h-[580px]'
              }
            `}
          >
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-3">Start</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg bg-slate-800/50 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm transition-all"
                  autoFocus
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              </div>
            </div>

            {searchQuery === '' ? (
              <>
                {/* Pinned Apps */}
                <div className="mb-5">
                  <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Pinned</h3>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-4' : 'grid-cols-6'}`}>
                    {APPS.map((app) => (
                      <motion.button
                        key={app.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAppClick(app.id)}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg p-2`}>
  <img
    src={app.icon}
    alt={app.label}
    className="w-full h-full object-contain"
    onError={(e) => { e.target.style.display = 'none'; }}
  />
</div>
                        <span className="text-xs text-center text-slate-300 leading-tight truncate w-full">
                          {app.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 my-4" />

                {/* Recommended */}
                <div className="mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">Recommended</h3>
                  {loadingProjects ? (
                    <div className="text-center py-4">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block text-2xl">⏳</motion.div>
                      <p className="text-xs text-slate-400 mt-1">Loading...</p>
                    </div>
                  ) : (
                    <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {projects.slice(0, isMobile ? 2 : 4).map((project) => (
                        <motion.button
                          key={`recommended-${project.id}`}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAppClick('projects')}
                          className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left w-full"
                        >
                          <span className="text-xl flex-shrink-0">{project.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-slate-300 truncate font-medium">{project.title}</p>
                            <p className="text-xs text-slate-500 truncate">{project.description || 'Featured project'}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 my-4" />

                {/* Power */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handlePowerButton}
                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <span>⏻</span> Shut down
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                {/* Search Results */}
                {filteredApps.length === 0 && filteredProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 text-sm">No results for "{searchQuery}"</p>
                  </div>
                ) : (
                  <>
                    {filteredApps.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Apps</h3>
                        <div className={`grid gap-3 ${isMobile ? 'grid-cols-4' : 'grid-cols-6'}`}>
                          {filteredApps.map((app) => (
                            <motion.button
                              key={`search-app-${app.id}`}
                              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              onClick={() => handleAppClick(app.id)}
                              className="flex flex-col items-center gap-1"
                            >
                              <div className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg p-2`}>
  <img
    src={app.icon}
    alt={app.label}
    className="w-full h-full object-contain"
    onError={(e) => { e.target.style.display = 'none'; }}
  />
</div>
                              <span className="text-xs text-center text-slate-300 truncate w-full">{app.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredProjects.length > 0 && (
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Projects</h3>
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                          {filteredProjects.map((project) => (
                            <motion.button
                              key={`search-project-${project.id}`}
                              whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}
                              onClick={() => handleAppClick('projects')}
                              className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left w-full"
                            >
                              <span className="text-xl flex-shrink-0">{project.icon}</span>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm text-slate-300 truncate font-medium">{project.title}</p>
                                <p className="text-xs text-slate-500 truncate">{project.tags?.join(', ')}</p>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}