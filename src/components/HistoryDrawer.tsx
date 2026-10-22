import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { HistoryItem } from '../types/calculator';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Hisoblash tarixi
            </h2>
            <p className="text-xs text-slate-400">
              {history.length > 0 ? `${history.length} ta amallar saqlangan` : 'Hozircha tarix bo\'sh'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <p>Amallarni bajarganingizda bu yerda saqlanadi.</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="group p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="overflow-hidden pr-2">
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate">
                    {item.expression}
                  </div>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    = {item.result}
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">
                    {item.timestamp}
                  </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl text-blue-600 dark:text-blue-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Tarixni tozalash
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
