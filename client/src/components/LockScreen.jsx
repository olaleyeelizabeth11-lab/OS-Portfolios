import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WALLPAPERS } from '../config/wallpapers';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
  return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState(formatTime(new Date()));
  const [date, setDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') {
        onUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onUnlock]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_20%),_linear-gradient(180deg,_rgba(14,30,60,0.65),_rgba(5,11,21,0.94))]" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 blur-[2px]"
        style={{ backgroundImage: `url('${WALLPAPERS.lock}')` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 px-6 py-24 text-center">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl">
          <p className="text-6xl font-semibold tracking-tight">{time}</p>
          <p className="mt-3 text-xl text-slate-200">{date}</p>
          <div className="mt-12 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.35em] text-slate-300">
            <span>Swipe up</span>
            <span className="h-1 w-14 rounded-full bg-slate-300/50" />
            <span className="unlock-hint">↑</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={onUnlock}
          className="rounded-3xl border border-white/20 bg-white/10 px-7 py-4 text-base uppercase tracking-[0.3em] text-slate-100 transition hover:border-white/30 hover:bg-white/15"
        >
          Unlock
        </motion.button>
      </div>
    </div>
  );
}
