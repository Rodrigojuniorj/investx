export function generateCacheKey<T>(name: string, query: T) {
  const queryKey = JSON.stringify(query);
  return `${name}-${queryKey}`;
}
