import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { WALLPAPERS } from '../config/wallpapers';

export default function LoginScreen({ onEnter }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onEnter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onEnter]);
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_15%),_linear-gradient(180deg,_rgba(20,28,50,0.88),_rgba(7,11,18,0.98))]" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 blur-[2px]"
        style={{ backgroundImage: `url('${WALLPAPERS.login}')` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-soft backdrop-blur-xl"
      >
        <div className="h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-slate-900">
          <img
            src="/images/elizabeth-profile.jpg"
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">Your Name</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Full Stack Developer</p>
        </div>
        <button
          onClick={onEnter}
          className="w-full rounded-3xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-winGlow transition hover:bg-blue-500"
        >
          Enter
        </button>
      </motion.div>
    </div>
  );
}
