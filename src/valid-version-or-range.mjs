import semver from 'semver'

import { xRangeRE } from './constants'

/**
 * Validates a string to be a valid version or range. By default, an exception is raised unless `options.disallowVersions`
 * is `true`, in which case it filters out invalid strings and returns a new array.
 * @param {string} input - The string to validate.
 * @param {object} options - The options to pass to the semver.valid function.
 * @param {boolean} options.disallowRanges - Whether to disallow ranges.
 * @param {boolean} options.disallowVersions - Whether to disallow versions and ranges which are valid versions.
 * @param {boolean} options.includePrerelease - Whether to include prerelease versions.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.onlyXRange - Whether to only allow x-ranges. Note, even if this is `true`, and a valid
 * x-range is presented, the returned string will still be normalized.
 * @param {boolean} options.throwIfInvalid - If true, throws an exception if the string is invalid.
 * @returns {string|null} - A normalized version or range string or `null` if the string is invalid (if
 * `options.throwIfInvalid` is `true`, in which case an exception is thrown).
 * @category Range operations
 */
const validVersionOrRange = (input = throw new Error("'input' is required."), {
  disallowRanges = false,
  disallowVersions = false,
  onlyXRange = false,
  throwIfInvalid = false,
  ...options
} = {}) => {
  if (disallowVersions === true && disallowRanges === true) {
    throw new Error("'disallowVersions' and 'disallowRanges' cannot both be true.")
  }
  if (disallowRanges === true && onlyXRange === true) {
    throw new Error("'disallowRanges' and 'onlyXRange' cannot both be true.")
  }

  let normalized = disallowRanges === true ? semver.valid(input, options) : semver.validRange(input, options)
  // test for x-range specifically
  if (normalized !== null && onlyXRange === true && input.match(xRangeRE) === null) {
    if (throwIfInvalid === true) {
      throw new Error(`'${input}' is a valid range, but an x-range is specifically expected.`)
    }
    normalized = null
  }
  // test for range exclusive of versions
  if (disallowVersions === true && semver.valid(input, options) !== null) {
    if (throwIfInvalid === true) {
      throw new Error(`'${input}' is a valid version, and a non-version range is expected.`)
    }
    normalized = null
  }
  // throw an exception if the string is invalid and `options.throwIfInvalid` is `true`
  if (normalized === null && throwIfInvalid === true) {
    const msg = `'${input}' is not a valid `
      + `${disallowVersions === true
        ? 'range exclusive of versions'
        : (disallowRanges === true ? 'version' : 'version or range')}.`
    throw new Error(msg)
  }

  return normalized
}

export { validVersionOrRange }
