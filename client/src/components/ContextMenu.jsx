import { motion, AnimatePresence } from 'framer-motion';

export default function ContextMenu({ position, items, onClose }) {
  return (
    <AnimatePresence>
      {position && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 50,
            }}
            className="rounded-lg border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick?.();
                  onClose();
                }}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-blue-500/30 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
