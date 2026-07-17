import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Welcome!',
    message: 'Explore my Windows 11 portfolio shell.',
    icon: '👋',
  },
  {
    id: 2,
    title: 'New Features',
    message: 'Draggable windows, live clock, and more!',
    icon: '✨',
  },
  {
    id: 3,
    title: 'Pro Tip',
    message: 'Double-click desktop icons to open windows.',
    icon: '💡',
  },
  {
    id: 4,
    title: 'Made with React',
    message: 'Built with React, Tailwind, and Framer Motion.',
    icon: '⚛️',
  },
];

export default function NotificationsPanel({ isOpen, onClose }) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-800/50">
              <h2 className="text-sm font-semibold text-white">Notifications</h2>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {NOTIFICATIONS.map((notif, idx) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{notif.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {notif.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                    <button className="text-slate-500 hover:text-slate-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold text-slate-400">{isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-medium transition-colors"
                >
                  {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </motion.button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 text-xs px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                  Clear All
                </button>
                <button className="flex-1 text-xs px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
