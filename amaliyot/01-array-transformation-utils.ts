/**
 * Array Transformation Utilities
 * The most commonly used array helper functions in frontend projects
 */

// 1. groupBy: Group elements by a given key
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  return array.reduce(
    (accumulator, currentItem) => {
      const key = keySelector(currentItem);
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(currentItem);
      return accumulator;
    },
    {} as Record<K, T[]>,
  );
}

// 2. chunk: Split an array into chunks of a specified size
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Size must be greater than zero");
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// 3. uniqueBy: Select unique elements from an array of objects by a key
export function uniqueBy<T, K>(array: T[], keySelector: (item: T) => K): T[] {
  const seen = new Set<K>();
  return array.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// Sample tests:
const users = [
  { id: 1, name: "Komila", role: "developer" },
  { id: 2, name: "Anvar", role: "designer" },
  { id: 3, name: "Malika", role: "developer" },
];

console.log(
  "Grouping:",
  groupBy(users, (u) => u.role),
);
console.log("Chunking:", chunk([1, 2, 3, 4, 5, 6, 7], 3));
