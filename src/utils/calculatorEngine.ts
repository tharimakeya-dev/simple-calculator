import { Operator } from '../types/calculator';

/**
 * Aniq hisoblash va suzuvchi vergul xatolarini to'g'rilash (masalan: 0.1 + 0.2 = 0.3)
 */
export const formatNumber = (num: number): string => {
  if (!isFinite(num)) {
    return 'Xatolik';
  }
  // Trim scientific or floating point quirks
  const rounded = parseFloat(num.toPrecision(12));
  return String(rounded);
};

export const calculateResult = (
  firstOperand: number,
  secondOperand: number,
  operator: Operator
): number => {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      if (secondOperand === 0) {
        throw new Error('Nolga bo\'lib bo\'lmaydi');
      }
      return firstOperand / secondOperand;
    case '%':
      return (firstOperand * secondOperand) / 100;
    default:
      return secondOperand;
  }
};

/**
 * Web Audio API yordamida yoqimli va yengil click tovushini hosil qilish
 */
export const playKeySound = (type: 'number' | 'operator' | 'action' | 'equals') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    let freq = 600;
    let duration = 0.04;

    if (type === 'number') {
      freq = 480;
      duration = 0.03;
    } else if (type === 'operator') {
      freq = 720;
      duration = 0.04;
    } else if (type === 'equals') {
      freq = 900;
      duration = 0.06;
    } else {
      freq = 380;
      duration = 0.035;
    }

    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Brauzer audio bloklagan bo'lsa indamay o'tib ketadi
  }
};
