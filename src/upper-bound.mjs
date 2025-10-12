import semver from 'semver'

/**
 * Finds the ceiling of a range. For '*', the ceiling is '*'. For specific versions or any range capped by a specific
 * version, the ceiling is that version. For any open-ended range, the ceiling is defined by a '<version>-0' range
 * function where 'verision-0' least range above the given range.
 * @param {string} range - The range to find the ceiling for.
 * @returns {string} - Either '*', a specific version, or a '<version>-0'.
 */
const upperBound = (range) => {
  const normalizedRange = semver.validRange(range)
  if (normalizedRange === null) {
    return null
  }

  const ranges = normalizedRange.split(' ')
  const upperRange = ranges[ranges.length - 1]

  return upperRange.startsWith('<=') ? upperRange.slice(2) : upperRange
}

export { upperBound }
