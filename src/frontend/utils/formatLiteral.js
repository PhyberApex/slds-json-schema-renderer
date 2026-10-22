/**
 * Render a JSON literal for documentation: strings are quoted so `"1"` and
 * `1`, or `"null"` and `null`, stay distinguishable; objects and arrays are
 * pretty-printed.
 */
export function formatLiteral(value) {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value) ?? String(value)
  }
  return JSON.stringify(value, null, 2)
}

export function isCompositeLiteral(value) {
  return value !== null && typeof value === 'object'
}
