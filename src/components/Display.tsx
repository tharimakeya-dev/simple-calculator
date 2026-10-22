import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface DisplayProps {
  displayValue: string;
  equation: string;
}

export const Display: React.FC<DisplayProps> = ({ displayValue, equation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback
    }
  };

  // Dynamically adjust the font size so long numbers fit
  const getFontSizeClass = (text: string) => {
    const len = text.length;
    if (len > 14) return 'text-2xl';
    if (len > 10) return 'text-3xl';
    if (len > 7) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div className="relative p-5 pb-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl mx-3 mt-3 border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-end min-h-[140px] select-text">
      {/* Top row: expression / formula */}
      <div className="h-6 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
        <span>{equation || '\u00A0'}</span>
        {displayValue !== '0' && (
          <button
            type="button"
            onClick={handleCopy}
            title="Copy result"
            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800/70 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 font-sans">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="font-sans">Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main large display result */}
      <div className="mt-2 text-right overflow-x-auto scrollbar-none">
        <span
          className={`font-semibold tracking-tight transition-all text-slate-900 dark:text-white font-mono ${getFontSizeClass(
            displayValue
          )}`}
        >
          {displayValue}
        </span>
      </div>
    </div>
  );
};