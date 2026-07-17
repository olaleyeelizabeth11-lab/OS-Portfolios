import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindow } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';

const SNAP_DISTANCE = 20;
const TASKBAR_HEIGHT = 56;

export default function Window({ windowData, children, isMobile = false }) {
  const { id, title, position, size, isMinimized, isMaximized, zIndex, icon } = windowData;
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize, focusedWindowId } = useWindow();
  const { isDarkMode } = useTheme();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef(null);
  const titleBarRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const handleMouseDown = (e) => {
    // Disable dragging on mobile
    if (isMobile) return;
    if (e.target.closest('button')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    focusWindow(id);
  };

  const handleResizeStart = (e, direction) => {
    // Disable resizing on mobile
    if (isMobile) return;
    e.preventDefault();
    setIsResizing(true);
    setResizeDir(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    focusWindow(id);
  };

  const snapToEdges = (x, y, width, height) => {
    let snappedX = x;
    let snappedY = y;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - TASKBAR_HEIGHT;

    // Snap to left edge
    if (x < SNAP_DISTANCE) snappedX = 0;
    // Snap to right edge
    if (windowWidth - (x + width) < SNAP_DISTANCE) snappedX = windowWidth - width;
    // Snap to top edge
    if (y < SNAP_DISTANCE) snappedY = 0;
    // Snap to bottom edge
    if (windowHeight - (y + height) < SNAP_DISTANCE) snappedY = windowHeight - height;

    return { x: snappedX, y: snappedY };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        const snapped = snapToEdges(newX, newY, size.width, size.height);
        updateWindowPosition(id, {
          x: Math.max(0, snapped.x),
          y: Math.max(0, snapped.y),
        });
      }

      if (isResizing && resizeDir) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = position.x;
        let newY = position.y;

        // Handle resize directions
        if (resizeDir.includes('e')) newWidth = Math.max(300, resizeStart.width + deltaX);
        if (resizeDir.includes('w')) {
          newWidth = Math.max(300, resizeStart.width - deltaX);
          newX = position.x + deltaX;
        }
        if (resizeDir.includes('s')) newHeight = Math.max(200, resizeStart.height + deltaY);
        if (resizeDir.includes('n')) {
          newHeight = Math.max(200, resizeStart.height - deltaY);
          newY = position.y + deltaY;
        }

        updateWindowSize(id, { width: newWidth, height: newHeight });
        if (newX !== position.x || newY !== position.y) {
          updateWindowPosition(id, { x: Math.max(0, newX), y: Math.max(0, newY) });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDir(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDir, resizeStart, id, position, size, updateWindowPosition, updateWindowSize]);

  // Accessibility: focus trap when this window is the focused window
  useEffect(() => {
    const node = windowRef.current;
    if (!node) return;

    const handleKeyDownTrap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = node.querySelectorAll(focusableSelectors);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (focusedWindowId === id) {
      previouslyFocusedRef.current = document.activeElement;
      const focusable = node.querySelectorAll(focusableSelectors);
      if (focusable.length) focusable[0].focus();
      else node.focus();
      window.addEventListener('keydown', handleKeyDownTrap);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDownTrap);
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        try { previouslyFocusedRef.current.focus(); } catch (err) {}
      }
    };
  }, [focusedWindowId, id]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeWindow(id);
    } else if (e.key.toLowerCase() === 'm' && e.ctrlKey) {
      e.preventDefault();
      minimizeWindow(id);
    } else if (e.key.toLowerCase() === 'x' && e.ctrlKey) {
      e.preventDefault();
      maximizeWindow(id);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      style={{
        position: 'fixed',
        left: isMobile ? 0 : position.x,
        top: isMobile ? 0 : position.y,
        width: isMobile ? '100%' : size.width,
        height: isMobile ? `calc(100% - ${TASKBAR_HEIGHT}px)` : size.height,
        zIndex: zIndex || 1000,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
      className={`flex flex-col ${isMobile ? 'rounded-none' : 'rounded-lg'} border ${isDarkMode ? 'border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl' : 'border-black/10 bg-white/100 shadow-sm'}`}
      onMouseDown={(e) => {
  if (e.target.closest('a, button, input, textarea')) return;
  focusWindow(id);
}}
      role="dialog"
      aria-label={title}
      aria-modal={false}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        onMouseDown={handleMouseDown}
        className="flex cursor-move items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-4 py-3 select-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-base text-white">{icon}</span>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => minimizeWindow(id)}
            className="rounded p-1 hover:bg-white/10 text-slate-300 transition-colors"
            title="Minimize"
            aria-label="Minimize window"
          >
            ─
          </button>
          <button
            onClick={() => maximizeWindow(id)}
            className="rounded p-1 hover:bg-white/10 text-slate-300 transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          >
            □
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="rounded p-1 hover:bg-red-500/30 text-slate-300 transition-colors"
            title="Close"
            aria-label="Close window"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto ${isDarkMode ? 'bg-slate-950/50' : 'bg-white/100 text-slate-900'}`}>
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corners */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize"
          />

          {/* Edges */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize"
          />
        </>
      )}
    </motion.div>
  );
}
