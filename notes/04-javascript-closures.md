# 🔒 JavaScript Closures

A **closure** is the ability of an inner function to **remember** the variables of its outer (parent) lexical environment, even after the parent function has finished executing.

---

## 📝 Simple practical example:

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// The count variable cannot be modified directly from the outside!
```

---

## 🎯 Key benefits:
1. **Data Encapsulation (hiding data)**: Creating private variables.
2. **Currying**: Building functions that take their arguments in stages.
3. **Preserving state in callbacks and event handling**.
