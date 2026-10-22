/**
 * Complete Deep Clone function
 * Creates a fully new copy of objects and arrays in memory
 */
export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // Primitive values and functions are returned directly
  if (Object(obj) !== obj || typeof obj === "function") {
    return obj;
  }

  // Check for circular references
  if (hash.has(obj as object)) {
    return hash.get(obj as object);
  }

  // Copy Date and RegExp objects separately
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof RegExp)
    return new RegExp(obj.source, obj.flags) as unknown as T;

  // Create a new copy for an array or object
  const result = (
    Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))
  ) as T;
  hash.set(obj as object, result);

  for (const key of Object.keys(obj)) {
    (result as any)[key] = deepClone((obj as any)[key], hash);
  }

  return result;
}
