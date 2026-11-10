# 🧼 Clean Code Principles in Frontend Development

Writing clean code not only makes teamwork easier, but also prevents bugs when extending the project in the future.

---

## 🎯 4 Golden Rules:

1. **DRY (Don't Repeat Yourself)**:
   * Don't repeat the same code in two places. Extract it into a separate function or Custom Hook.
2. **KISS (Keep It Simple, Stupid)**:
   * A simple solution is always better than a complex architecture.
3. **Single Responsibility**:
   * A component should do only one thing (for example, `UserCard` should only display the profile, not deal with loading data from the API).
4. **Clear and meaningful naming**:
   * Don't name variables `data`, `item`, or `x`; give them clear names that say what they are (`userData`, `productItem`).
