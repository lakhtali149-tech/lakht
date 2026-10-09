import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isWarn = t.type === 'warn';

        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-950/95 dark:bg-zinc-900/95 text-white border border-zinc-800 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarn && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isWarn && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white tracking-tight">{t.title}</p>
              <p className="text-xs text-zinc-300 mt-0.5 leading-snug">{t.message}</p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-zinc-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
