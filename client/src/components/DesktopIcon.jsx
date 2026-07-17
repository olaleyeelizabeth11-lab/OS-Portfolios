import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DesktopIcon({ icon, label, onClick, onDoubleClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const clickTimer = useRef(null);
  const clickCount = useRef(0);

  const handleClick = (e) => {
    e.stopPropagation();
    clickCount.current += 1;

    if (clickCount.current === 1) {
      // First click — select icon
      setIsSelected(true);

      clickTimer.current = setTimeout(() => {
        // Single click only — just select
        clickCount.current = 0;
      }, 300);
    } else if (clickCount.current === 2) {
      // Double click — open window
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      setIsSelected(false);
      onDoubleClick?.();
    }
  };

  // ✅ Touch devices — single tap opens window immediately
  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(false);
    onDoubleClick?.();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 p-2"
    >
      <div
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="button"
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDoubleClick?.();
          }
        }}
        className={`flex h-20 w-20 items-center justify-center rounded-lg transition-all cursor-pointer ${
          isSelected
            ? 'bg-blue-500/30 ring-2 ring-blue-400'
            : 'hover:bg-white/10'
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900/35 p-2 shadow-sm ring-1 ring-white/10">
          {typeof icon === 'string' ? (
            <span className="text-4xl leading-none">{icon}</span>
          ) : (
            icon
          )}
        </div>
      </div>
      <span className={`w-20 truncate text-center text-xs font-medium transition-all ${
        isSelected ? 'text-blue-300 drop-shadow-lg' : 'text-slate-300'
      }`}>
        {label}
      </span>
    </motion.div>
  );
}