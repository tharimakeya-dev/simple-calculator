# ⚛️ React `useEffect` Hook and the Cleanup Mechanism

In React function components, `useEffect` is used to manage side effects (API calls, subscriptions, DOM manipulation).

---

## 📌 Dependency Array rules:

1. **No array provided**:
   ```tsx
   useEffect(() => {
     // Runs on every render
   });
   ```

2. **Empty array (`[]`)**:
   ```tsx
   useEffect(() => {
     // Runs only once, when the component is first rendered on screen (Mount)
   }, []);
   ```

3. **Array with values (`[userId, count]`)**:
   ```tsx
   useEffect(() => {
     // Runs when userId or count changes
   }, [userId, count]);
   ```

---

## 🧹 Why is the cleanup function needed?

A cleanup function is returned to prevent memory leaks when the component is removed from the DOM (Unmount) or before the effect re-runs:

```tsx
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Cleanup:
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```
