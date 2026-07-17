import { createContext, useContext, useState, useCallback } from 'react';

const WindowContext = createContext();

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [focusedWindowId, setFocusedWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1000);

const openWindow = useCallback((id, title, type, icon) => {
  setNextZIndex((prevZ) => {
    const newZ = prevZ + 1;
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        // If minimized, restore it
        setFocusedWindowId(id);
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w
        );
      }

      // ✅ Responsive sizing based on screen size
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const isMobileScreen = screenW < 768;
      const isTablet = screenW >= 768 && screenW < 1024;

      let width, height, x, y;

      if (isMobileScreen) {
        // Full screen on mobile
        width = screenW;
        height = screenH - 56;
        x = 0;
        y = 0;
      } else if (isTablet) {
        // Nearly full screen on tablet
        width = Math.min(700, screenW - 40);
        height = Math.min(500, screenH - 100);
        x = (screenW - width) / 2;
        y = 20;
      } else {
        // Desktop — centered, reasonable size
        width = Math.min(800, screenW - 100);
        height = Math.min(600, screenH - 120);
        x = (screenW - width) / 2 + (Math.random() * 60 - 30);
        y = (screenH - height) / 2 + (Math.random() * 40 - 20);
      }

      const newWindow = {
        id,
        title,
        type,
        icon,
        isMinimized: false,
        isMaximized: isMobileScreen, // ✅ auto-maximize on mobile
        position: { x: Math.max(0, x), y: Math.max(0, y) },
        size: { width, height },
        zIndex: newZ,
        previousSize: null,
        previousPosition: null,
      };

      setFocusedWindowId(id);
      return [...prev, newWindow];
    });
    return newZ;
  });
}, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedWindowId(null);
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        
        if (w.isMaximized) {
          // Restore to previous size
          return {
            ...w,
            isMaximized: false,
            size: w.previousSize || { width: 800, height: 600 },
            position: w.previousPosition || { x: 50, y: 50 },
          };
        } else {
          // Maximize
          return {
            ...w,
            isMaximized: true,
            previousSize: w.size,
            previousPosition: w.position,
            size: { width: window.innerWidth, height: window.innerHeight - 56 },
            position: { x: 0, y: 0 },
          };
        }
      })
    );
  }, []);

  const focusWindow = useCallback((id) => {
    setNextZIndex((prevZ) => {
      const newZ = prevZ + 1;
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
      return newZ;
    });
    setFocusedWindowId(id);
  }, []);

  const updateWindowPosition = useCallback((id, position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id, size) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        focusedWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindow() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindow must be used within WindowProvider');
  }
  return context;
}
