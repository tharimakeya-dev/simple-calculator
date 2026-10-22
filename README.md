# 🧮 Simple Calculator (Smart Modern Calculator)

An interactive calculator web app built with React 19, TypeScript, and Tailwind CSS, featuring a modern, user-friendly, and good-looking interface.

![Calculator](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)

---

## ✨ Key Features

- **Basic arithmetic operations**:
  - Addition (`+`), subtraction (`-`), multiplication (`×`), division (`÷`), percentage (`%`).
- **Additional scientific functions**:
  - Square (\(x^2\))
  - Square root (\(\sqrt{x}\))
  - Reciprocal (\(1/x\))
  - Sign toggle (\(\pm\))
- **Calculation History**:
  - All completed calculations are saved automatically (`localStorage`).
  - Click any history item to load its result back onto the display.
  - Clear the whole history with a single button.
- **Themes (Light / Dark Mode)**:
  - Dark and light modes. Follows the system preference and remembers the user's choice.
- **Sound Feedback**:
  - A pleasant click sound when pressing buttons, using the Web Audio API (can be turned on or off at any time).
- **Copy to Clipboard**:
  - Copy the result with a single click.
- **Full Keyboard Control (Keyboard Shortcuts)**:
  - Perform every operation quickly using only the keyboard, no mouse needed.

---

## ⌨️ Keyboard Shortcuts

| Key             | Action                         |
| :-------------- | :----------------------------- |
| `0` - `9`       | Enter digits                   |
| `+` `-` `*` `/` | Arithmetic operations          |
| `Enter` or `=`  | Calculate the result           |
| `Backspace`     | Delete the last entered digit  |
| `Escape` or `C` | Clear the display (AC)         |
| `%`             | Percentage operation           |
| `H`             | Open / close the history panel |
| `T`             | Toggle theme (Dark / Light)    |

---

## 🚀 Getting Started

1. **Download or clone the repository**:

```bash
   git clone https://github.com/komilazokirova/loyixa.00.git
   cd simple-calculator
```

2. **Install dependencies**:

```bash
   npm install
```

3. **Run on a local server**:

```bash
   npm run dev
```

4. **Build for production**:

```bash
   npm run build
```

---

## 📁 Project Structure

```
simple-calculator/
├── src/
│   ├── components/
│   │   ├── Display.tsx                # Large display and copy button
│   │   ├── Header.tsx                 # Logo, theme, audio, and modals
│   │   ├── Keypad.tsx                 # Number and operation buttons
│   │   ├── HistoryDrawer.tsx          # Calculation history
│   │   └── KeyboardShortcutsModal.tsx # Keyboard help
│   ├── hooks/
│   │   └── useCalculator.ts           # Calculator state and operations
│   ├── types/
│   │   └── calculator.ts              # TypeScript types
│   ├── utils/
│   │   └── calculatorEngine.ts        # Arithmetic logic and Web Audio
│   ├── App.tsx                        # Main page
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Tailwind and custom styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

Developer: **Tharima keya**
