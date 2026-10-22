import React from 'react';
import { Sun, Moon, Volume2, VolumeX, History, HelpCircle, Calculator } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onOpenHistory: () => void;
  onOpenHelp: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  onOpenHistory,
  onOpenHelp,
  historyCount,
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Simple Calculator
          </h1>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            React + TypeScript + Tailwind
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? "Turn sound off" : "Turn sound on"}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-500" />}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          title="Toggle theme (Light / Dark)"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
        </button>

        <button
          type="button"
          onClick={onOpenHistory}
          title="Calculation history"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
        >
          <History className="w-4 h-4" />
          {historyCount > 0 && (
            <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </button>

        <button
          type="button"
          onClick={onOpenHelp}
          title="Keyboard shortcuts help"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};