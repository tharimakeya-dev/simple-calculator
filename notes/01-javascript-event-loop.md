# 🔄 JavaScript Event Loop: Microtasks and Macrotasks

JavaScript is a **single-threaded** programming language that can only execute one operation at a time. So how does it work asynchronously (non-blocking)? This is achieved through the **Event Loop** mechanism.

---

## 🧱 Core components:

1. **Call Stack**:
   * The stack of functions currently being executed (LIFO — Last In, First Out).
2. **Web APIs (Browser environment)**:
   * Asynchronous capabilities provided by the browser, such as `setTimeout`, `fetch`, and DOM events.
3. **Microtask Queue**:
   * Results of `Promise.then/catch/finally`, `queueMicrotask`, and `async/await`.
4. **Macrotask / Task Queue**:
   * `setTimeout`, `setInterval`, `setImmediate`, I/O operations.

---

## ⚡ Execution order (Priority rule):

1. All synchronous code on the Call Stack runs to completion.
2. As soon as the Call Stack is empty, the Event Loop picks up and executes all tasks in the **Microtask Queue** in order.
3. After the microtasks finish, **one** Macrotask is taken and executed.
4. The cycle repeats.

> 💡 **Rule**: Microtasks always run before Macrotasks!
