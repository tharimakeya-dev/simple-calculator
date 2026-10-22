import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { HistoryDrawer } from './components/HistoryDrawer';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { useCalculator } from './hooks/useCalculator';
import { Theme, Operator } from './types/calculator';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('calc_theme') as Theme;
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const {
    displayValue,
    equation,
    operator,
    history,
    soundEnabled,
    inputDigit,
    inputDecimal,
    backspace,
    allClear,
    toggleSign,
    calculateSquare,
    calculateSquareRoot,
    calculateReciprocal,
    performOperation,
    handleEquals,
    selectHistoryItem,
    clearHistory,
    toggleSound,
  } = useCalculator();

  // Add the dark / light theme class to the document's html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('calc_theme', theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Capture keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if the user is typing inside an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        inputDigit(key);
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        inputDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        performOperation(key as Operator);
      } else if (key === '%') {
        e.preventDefault();
        performOperation('%');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        backspace();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        e.preventDefault();
        allClear();
      } else if (key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHistoryOpen(prev => !prev);
      } else if (key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    inputDigit,
    inputDecimal,
    performOperation,
    handleEquals,
    backspace,
    allClear,
    toggleTheme,
  ]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-radial from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Calculator body */}
      <div className="relative w-full max-w-sm glass-panel bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          historyCount={history.length}
        />

        <Display displayValue={displayValue} equation={equation} />

        <Keypad
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperator={performOperation}
          onEquals={handleEquals}
          onAllClear={allClear}
          onBackspace={backspace}
          onToggleSign={toggleSign}
          onSquare={calculateSquare}
          onSquareRoot={calculateSquareRoot}
          onReciprocal={calculateReciprocal}
          activeOperator={operator}
        />

        {/* Footer info */}
        <div className="py-2.5 text-center border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Keys: <kbd className="px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-[10px]">Enter</kbd> result, <kbd className="px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-[10px]">H</kbd> history, <kbd className="px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-[10px]">T</kbd> theme
          </p>
        </div>
      </div>

      {/* Modals */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={selectHistoryItem}
        onClear={clearHistory}
      />

      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </main>
  );
};

export default App;