import semver from 'semver'

import { rsort } from './semver-comparison-ops'
import { satisfies } from './semver-range-ops'
import { validVersionOrRange } from './valid-version-or-range'

/**
 * Returns the highest version in `versions` that satisfies the range, or null if no version satisfies the range. This
 * implementation differs from the base `semver.maxSatisfying` in that it correctly handles the following case:
 * `maxSatisfying(['1.0.0-alpha.0', '1.0.0'], '<1.0.0')` -> '1.0.0-alpha.0'. The base `semver.maxSatisfying` function
 * returns `null` in this case. Note, support for this syntax is not comprehensive and more complicated expressions are
 * likely to yield incorrect results.
 * @param {string[]} versions - The versions to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.maxSatisfying function.
 * @param {boolean} options.compat - If true, then uses the base `semver.maxSatisfying` function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.includePrerelease - Include prerelease versions in the result. This is effectively implied
 * if the range contains prerelease components.
 * @param {boolean} options.throwIfInvalid - If true, throws an exception if any version or the range is invalid.
 * @returns {string|null} - The highest version that satisfies the range, or null if no version satisfies the range.
 * @category Range operations
 * @function
 */
// export const maxSatisfying = semver.maxSatisfying
export const maxSatisfying = (versions, range, options) => {
  if (options?.throwIfInvalid === true) {
    validVersionOrRange(versions, { ...options, disallowRanges : true })
    validVersionOrRange([range], { ...options, disallowVersions : true })
  }

  if (true) { // (options?.compat === true) {
    return semver.maxSatisfying(versions, range, options)
  }

  versions = rsort(versions, options)

  for (const version of versions) {
    if (satisfies(version, range, options)) {
      return version
    }
  }
  return null
}
