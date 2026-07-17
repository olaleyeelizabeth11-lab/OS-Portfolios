import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LockScreen from './components/LockScreen';
import LoginScreen from './components/LoginScreen';
import { WindowProvider, useWindow } from './context/WindowContext';
import Desktop from './components/Desktop';
import ToastContainer, { useToast } from './components/ToastContainer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [unlocked, setUnlocked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const { openWindow } = useWindow();
  const keyPressSequence = useRef('');
  const { isDarkMode } = useTheme();

  // Show welcome notification when desktop is unlocked
  useEffect(() => {
    if (unlocked) {
      // Small delay to ensure desktop is fully rendered
      const timer = setTimeout(() => {
        addToast(
          'Welcome! 👋',
          'Explore my Windows 11 portfolio shell. Double-click icons to open windows.',
          '🪟',
          6000
        );

        // Show additional tips after a delay
        const tipsTimer = setTimeout(() => {
          addToast(
            'Pro Tip 💡',
            'Right-click the desktop to personalize the wallpaper!',
            '🎨',
            5000
          );
        }, 3000);

        return () => clearTimeout(tipsTimer);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [unlocked, addToast]);

  // Global keystroke listener for "sudo hire me" easter egg
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only listen when unlocked
      if (!unlocked) return;

      // Build sequence from typed characters
      keyPressSequence.current += e.key.toLowerCase();

      // Keep only last 50 characters to prevent memory bloat
      if (keyPressSequence.current.length > 50) {
        keyPressSequence.current = keyPressSequence.current.slice(-40);
      }

      // Check if "sudo hire me" was typed (with spaces/punctuation variations)
      if (keyPressSequence.current.includes('sudohireme') || 
          keyPressSequence.current.includes('sudo hire me')) {
        // Reset sequence
        keyPressSequence.current = '';

        // Open terminal with easter egg
        openWindow('terminal');
        addToast(
          '🎯 EASTER EGG FOUND! 🎯',
          'Type "sudo hire me" in the terminal to trigger the hiring protocol!',
          '✨',
          5000
        );
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [unlocked, openWindow, addToast]);

  useEffect(() => {
    const handleAdminShortcut = (e) => {
      if (!unlocked) return;
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openWindow('admin', 'Admin Panel', 'admin', '🔒');
        addToast(
          'Hidden Admin Panel Opened',
          'Use the secret admin login to manage projects.',
          '🔐',
          5000
        );
      }
    };

    window.addEventListener('keydown', handleAdminShortcut);
    return () => window.removeEventListener('keydown', handleAdminShortcut);
  }, [unlocked, openWindow, addToast]);

  return (
    <div className={`w-full h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{
      background: isDarkMode 
        ? 'radial-gradient(circle at top, rgba(59,130,246,0.14), transparent 25%), linear-gradient(180deg, #0f172a 0%, #0b1220 100%)'
        : 'radial-gradient(circle at top, rgba(219,234,254,0.4), transparent 25%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      color: isDarkMode ? 'white' : '#1e293b'
    }}>
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen"
          >
            {!showLogin ? (
              <LockScreen onUnlock={() => setShowLogin(true)} />
            ) : (
              <LoginScreen onEnter={() => setUnlocked(true)} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen"
          >
            <>
              <Desktop />
              <ToastContainer toasts={toasts} onRemove={removeToast} />
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <AppContent />
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;
