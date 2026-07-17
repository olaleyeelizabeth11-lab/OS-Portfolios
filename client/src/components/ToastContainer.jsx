import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, icon = '📢', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, icon, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              title={toast.title}
              message={toast.message}
              icon={toast.icon}
              duration={toast.duration}
              onClose={onRemove}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
