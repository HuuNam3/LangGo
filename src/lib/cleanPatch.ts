export function cleanPatch<T extends object>(data: Partial<T>): Partial<T> {
  const cleaned = { ...data }
  Object.keys(cleaned).forEach((key) => {
    const typedKey = key as keyof T
    if (cleaned[typedKey] === undefined) {
      delete cleaned[typedKey]
    }
  })
  return cleaned
}