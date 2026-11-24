# ⚡ React Performance Optimization: When Should You Use It?

New developers often wrap every function and variable in `useCallback` or `useMemo`. This actually backfires — it can slow your app down.

---

## 🔍 When to use what?

1. **`React.memo`**:
   * When a component should re-render only if its props change.

2. **`useCallback`**:
   * When passing a function defined inside a component as a prop to child components wrapped in `React.memo`.
   * Otherwise, a new function reference is created on every render and the child re-renders anyway.

3. **`useMemo`**:
   * To cache the results of expensive (heavy) calculations:
   ```tsx
   const filteredList = useMemo(() => {
     return heavyCalculation(items);
   }, [items]);
   ```
