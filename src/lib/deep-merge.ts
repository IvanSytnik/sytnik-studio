type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursively merges `override` into `base` without mutating either.
 * Arrays and primitives from `override` replace the base value as a whole.
 * Used to fall back to English for keys a locale hasn't translated yet.
 */
export function deepMerge<T extends PlainObject>(
  base: T,
  override: PlainObject
): T {
  const result: PlainObject = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    result[key] =
      isPlainObject(current) && isPlainObject(value)
        ? deepMerge(current, value)
        : value;
  }
  return result as T;
}
