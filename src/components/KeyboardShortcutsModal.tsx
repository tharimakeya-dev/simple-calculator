import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 - 9', desc: 'Digits' },
    { key: '+  -  *  /', desc: 'Basic operations (add, subtract, multiply, divide)' },
    { key: 'Enter or =', desc: 'Calculate (result)' },
    { key: 'Backspace', desc: 'Delete last digit' },
    { key: 'Escape or c', desc: 'Clear calculator (AC)' },
    { key: '%', desc: 'Percentage' },
    { key: 'h', desc: 'Open/close history panel' },
    { key: 't', desc: 'Toggle theme (Dark / Light)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
            >
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {sc.desc}
              </span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-semibold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg shadow-xs border border-slate-200 dark:border-slate-600">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};