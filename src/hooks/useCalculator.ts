import { useState, useEffect, useCallback } from 'react';
import { HistoryItem, Operator } from '../types/calculator';
import { calculateResult, formatNumber, playKeySound } from '../utils/calculatorEngine';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [equation, setEquation] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Tarixni localStorage'dan o'qish va saqlash
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calc_history', JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  const sound = useCallback((type: 'number' | 'operator' | 'action' | 'equals') => {
    if (soundEnabled) {
      playKeySound(type);
    }
  }, [soundEnabled]);

  // Raqam kiritish
  const inputDigit = useCallback((digit: string) => {
    sound('number');
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(prev => (prev === '0' ? digit : prev + digit));
    }
  }, [waitingForOperand, sound]);

  // Nuqta (.) kiritish
  const inputDecimal = useCallback(() => {
    sound('number');
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(prev => prev + '.');
    }
  }, [waitingForOperand, displayValue, sound]);

  // Bitta belgini o'chirish (Backspace)
  const backspace = useCallback(() => {
    sound('action');
    if (waitingForOperand) return;
    if (displayValue.length > 1) {
      setDisplayValue(prev => prev.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  }, [waitingForOperand, displayValue, sound]);

  // Hammasini tozalash (AC)
  const allClear = useCallback(() => {
    sound('action');
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setEquation('');
  }, [sound]);

  // Faqat joriy qiymatni tozalash (C)
  const clearEntry = useCallback(() => {
    sound('action');
    setDisplayValue('0');
  }, [sound]);

  // Ishorani o'zgartirish (+/-)
  const toggleSign = useCallback(() => {
    sound('action');
    const value = parseFloat(displayValue);
    if (value !== 0) {
      setDisplayValue(formatNumber(-value));
    }
  }, [displayValue, sound]);

  // Kvadrat (x²)
  const calculateSquare = useCallback(() => {
    sound('action');
    const current = parseFloat(displayValue);
    const result = current * current;
    const resStr = formatNumber(result);
    setEquation(`${current}² =`);
    setDisplayValue(resStr);
    setWaitingForOperand(true);

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: `${current}²`,
      result: resStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => [newItem, ...prev.slice(0, 29)]);
  }, [displayValue, sound]);

  // Kvadrat ildiz (√x)
  const calculateSquareRoot = useCallback(() => {
    sound('action');
    const current = parseFloat(displayValue);
    if (current < 0) {
      setDisplayValue('Xatolik');
      setWaitingForOperand(true);
      return;
    }
    const result = Math.sqrt(current);
    const resStr = formatNumber(result);
    setEquation(`√(${current}) =`);
    setDisplayValue(resStr);
    setWaitingForOperand(true);

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: `√(${current})`,
      result: resStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => [newItem, ...prev.slice(0, 29)]);
  }, [displayValue, sound]);

  // 1/x (teskari son)
  const calculateReciprocal = useCallback(() => {
    sound('action');
    const current = parseFloat(displayValue);
    if (current === 0) {
      setDisplayValue('Xatolik');
      setWaitingForOperand(true);
      return;
    }
    const result = 1 / current;
    const resStr = formatNumber(result);
    setEquation(`1/(${current}) =`);
    setDisplayValue(resStr);
    setWaitingForOperand(true);

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: `1/(${current})`,
      result: resStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => [newItem, ...prev.slice(0, 29)]);
  }, [displayValue, sound]);

  // Arifmetik amal (+, -, *, /, %)
  const performOperation = useCallback((nextOperator: Operator) => {
    sound('operator');
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setEquation(`${formatNumber(inputValue)} ${nextOperator}`);
    } else if (operator) {
      if (waitingForOperand) {
        setOperator(nextOperator);
        setEquation(`${formatNumber(previousValue)} ${nextOperator}`);
        return;
      }

      try {
        const result = calculateResult(previousValue, inputValue, operator);
        const resStr = formatNumber(result);
        setDisplayValue(resStr);
        setPreviousValue(result);
        setEquation(`${resStr} ${nextOperator}`);
      } catch (err: unknown) {
        setDisplayValue('Xatolik');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [displayValue, previousValue, operator, waitingForOperand, sound]);

  // Tenglik (=) bosilganda hisoblash
  const handleEquals = useCallback(() => {
    sound('equals');
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null) {
      try {
        const result = calculateResult(previousValue, inputValue, operator);
        const resStr = formatNumber(result);
        const expr = `${formatNumber(previousValue)} ${operator} ${formatNumber(inputValue)}`;
        
        setEquation(`${expr} =`);
        setDisplayValue(resStr);

        // Tarixga qo'shish
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          expression: expr,
          result: resStr,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setHistory(prev => [newItem, ...prev.slice(0, 29)]);

        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      } catch {
        setDisplayValue('Xatolik');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      }
    }
  }, [operator, previousValue, displayValue, sound]);

  // Tarixdan tanlash
  const selectHistoryItem = useCallback((item: HistoryItem) => {
    setDisplayValue(item.result);
    setEquation(`${item.expression} =`);
    setWaitingForOperand(true);
  }, []);

  // Tarixni tozalash
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('calc_history');
    } catch {
      // Ignore
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    displayValue,
    equation,
    operator,
    history,
    soundEnabled,
    inputDigit,
    inputDecimal,
    backspace,
    allClear,
    clearEntry,
    toggleSign,
    calculateSquare,
    calculateSquareRoot,
    calculateReciprocal,
    performOperation,
    handleEquals,
    selectHistoryItem,
    clearHistory,
    toggleSound,
  };
};
