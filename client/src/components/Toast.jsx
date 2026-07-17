import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Toast({ id, title, message, icon, onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 400, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-80 rounded-lg border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden"
    >
      <div className="p-4 flex gap-3">
        {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          {title && <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>}
          {message && <p className="text-xs text-slate-300">{message}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left"
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
