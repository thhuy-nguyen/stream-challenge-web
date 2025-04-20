'use client';

import { useEffect, ReactNode, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// Toast variants
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

// Toast options
export interface ToastOptions {
  message: string;
  title?: string;
  variant?: ToastVariant;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  alignment?: 'start' | 'center' | 'end';
}

// Toast component props
interface ToastProps extends ToastOptions {
  id: string;
  onClose: (id: string) => void;
}

// Toast component
const Toast = ({ id, message, title, variant = 'info', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  // Determine alert class based on variant
  const alertClass = `alert alert-${variant}`;

  // Get appropriate icon based on variant
  let icon;
  switch (variant) {
    case 'success':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'error':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      break;
    case 'warning':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      break;
    default: // info
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }

  return (
    <div className={alertClass}>
      {icon}
      <div>
        {title && <h3 className="font-bold">{title}</h3>}
        <div className="text-sm">{message}</div>
      </div>
      <button className="btn btn-circle btn-xs" onClick={() => onClose(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Toast container component
const ToastContainer = ({ 
  toasts, 
  position = 'top', 
  alignment = 'end',
  onClose 
}: { 
  toasts: (ToastProps & { id: string })[], 
  position?: 'top' | 'bottom' | 'middle',
  alignment?: 'start' | 'center' | 'end',
  onClose: (id: string) => void 
}) => {
  // Build the positioning classes based on the position and alignment params
  const positionClass = `toast-${position} toast-${alignment}`;

  return (
    <div className={`toast ${positionClass} z-50`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

// Toast context to manage toasts
interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Client-side only component for the toast container
const ClientOnlyPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};

// Toast provider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const showToast = (options: ToastOptions) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...options, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ClientOnlyPortal>
        {toasts.length > 0 && (
          <ToastContainer 
            toasts={toasts} 
            position={toasts[0]?.position || 'top'} 
            alignment={toasts[0]?.alignment || 'end'} 
            onClose={removeToast} 
          />
        )}
      </ClientOnlyPortal>
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};