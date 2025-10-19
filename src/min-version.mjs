import semver from 'semver'

import { prereleaseXRangeRE } from './constants'

/**
 * Returns the lowest version that satisfies the range, or null if no version satisfies the range. This implementation
 * differs from the base `semver.minVersion` in that it correctly handles simple prerelease x-ranges. E.g.,
 * '1.0.0-alpha.x' -> '1.0.0-alpha.0'. To suppress this behavior, pass `options.compat = true`. Note, support for this
 * syntax is not comprehensive and more complicated expressions are likely to yield incorrect results.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.minVersion function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.includePrerelease - Whether to include prerelease versions.
 * @param {boolean} options.compat - If true, prerelease ranges are treated the same as in the base semver package;
 * e.g. `minVersion('1.0.0-alpha.x', { compat: true })` -> '1.0.0-alpha.x'.
 * @returns {string|null} - The lowest version that satisfies the range, or null if no version satisfies the range.
 * @category Range operations
 */
const minVersion = (range, options) => {
  // we have to do this first, because semver does not recognize prerelease X-ranges ending with '*' (even though it
  // does recognize these as valid ranges)
  if (options?.compat !== true && range.match(prereleaseXRangeRE)) {
    return range.slice(0, -1) + '0'
  }
  return semver.minVersion(range, options)
}

export { minVersion }
