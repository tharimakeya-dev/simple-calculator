import React from 'react';
import { Delete, Divide, X, Minus, Plus, Equal, Percent } from 'lucide-react';
import { Operator } from '../types/calculator';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (op: Operator) => void;
  onEquals: () => void;
  onAllClear: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onSquare: () => void;
  onSquareRoot: () => void;
  onReciprocal: () => void;
  activeOperator: Operator;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onAllClear,
  onBackspace,
  onToggleSign,
  onSquare,
  onSquareRoot,
  onReciprocal,
  activeOperator,
}) => {
  const btnBase =
    'relative flex items-center justify-center font-medium rounded-2xl select-none transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-xs cursor-pointer';

  const numBtn = `${btnBase} h-14 text-xl font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60`;

  const sciBtn = `${btnBase} h-10 text-xs font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/60 border border-slate-200/40 dark:border-slate-700/40`;

  const actionBtn = `${btnBase} h-14 text-sm font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-200/50 dark:border-rose-900/30`;

  const utilBtn = `${btnBase} h-14 text-base font-semibold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300/60 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50`;

  const opBtn = (op: Operator) =>
    `${btnBase} h-14 text-lg font-semibold transition-colors ${
      activeOperator === op
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
        : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200/50 dark:border-blue-800/30'
    }`;

  const equalsBtn = `${btnBase} h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md shadow-blue-600/30`;

  return (
    <div className="p-3 space-y-2">
      {/* Tezkor ilmiy funksiyalar (x², √x, 1/x, ±) */}
      <div className="grid grid-cols-4 gap-2">
        <button type="button" onClick={onSquare} className={sciBtn} title="Kvadrat (x²)">
          x²
        </button>
        <button type="button" onClick={onSquareRoot} className={sciBtn} title="Kvadrat ildiz (√x)">
          √x
        </button>
        <button type="button" onClick={onReciprocal} className={sciBtn} title="Teskari qiymat (1/x)">
          1/x
        </button>
        <button type="button" onClick={onToggleSign} className={sciBtn} title="Ishorani almashtirish (±)">
          ±
        </button>
      </div>

      {/* Asosiy kalkulyator tugmalari */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button type="button" onClick={onAllClear} className={actionBtn} title="Hammasini tozalash (AC)">
          AC
        </button>
        <button type="button" onClick={onBackspace} className={utilBtn} title="Bitta belgini o'chirish">
          <Delete className="w-5 h-5" />
        </button>
        <button type="button" onClick={() => onOperator('%')} className={utilBtn} title="Foiz (%)">
          <Percent className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => onOperator('/')} className={opBtn('/')} title="Bo'lish (÷)">
          <Divide className="w-5 h-5" />
        </button>

        {/* Row 2 */}
        <button type="button" onClick={() => onDigit('7')} className={numBtn}>
          7
        </button>
        <button type="button" onClick={() => onDigit('8')} className={numBtn}>
          8
        </button>
        <button type="button" onClick={() => onDigit('9')} className={numBtn}>
          9
        </button>
        <button type="button" onClick={() => onOperator('*')} className={opBtn('*')} title="Ko'paytirish (×)">
          <X className="w-5 h-5" />
        </button>

        {/* Row 3 */}
        <button type="button" onClick={() => onDigit('4')} className={numBtn}>
          4
        </button>
        <button type="button" onClick={() => onDigit('5')} className={numBtn}>
          5
        </button>
        <button type="button" onClick={() => onDigit('6')} className={numBtn}>
          6
        </button>
        <button type="button" onClick={() => onOperator('-')} className={opBtn('-')} title="Ayrish (-)">
          <Minus className="w-5 h-5" />
        </button>

        {/* Row 4 */}
        <button type="button" onClick={() => onDigit('1')} className={numBtn}>
          1
        </button>
        <button type="button" onClick={() => onDigit('2')} className={numBtn}>
          2
        </button>
        <button type="button" onClick={() => onDigit('3')} className={numBtn}>
          3
        </button>
        <button type="button" onClick={() => onOperator('+')} className={opBtn('+')} title="Qo'shish (+)">
          <Plus className="w-5 h-5" />
        </button>

        {/* Row 5 */}
        <button type="button" onClick={() => onDigit('0')} className={`${numBtn} col-span-2`}>
          0
        </button>
        <button type="button" onClick={onDecimal} className={numBtn} title="O'nlik nuqta (.)">
          .
        </button>
        <button type="button" onClick={onEquals} className={equalsBtn} title="Natija (=)">
          <Equal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
