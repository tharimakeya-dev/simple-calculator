# 📘 TypeScript: `interface` vs `type`

In TypeScript, either `interface` or `type` is used to define data structures. They are similar in many ways, but there are important differences.

---

## ⚖️ Key differences:

1. **Declaration Merging (merging interfaces with the same name)**:
   * If an `interface` is declared multiple times with the same name, its fields are merged automatically.
   * With `type`, the name cannot be redeclared (it throws an error).

2. **Unions and Primitives**:
   * With `type` you can define Unions (`type Status = 'pending' | 'success'`) and name primitives.
   * `interface` can only describe Object or Function structures.

---

## 💡 Rule of thumb:
* Use **`interface`** for object shapes and library models,
* Use **`type`** for Unions, Tuples and complex type combinations.
