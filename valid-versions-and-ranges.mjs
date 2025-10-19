import { validVersionOrRange } from './valid-version-or-range'

/**
 * Validates or filters a list of strings allowing only versions and ranges. By default, an exception is raised
 * unless `options.ignoreNonVersions` is `true`, in which case it filters out invalid strings.
 * @param {string[]} input - The list of versions and ranges to filter.
 * @param {object} options - The options to pass to the validVersionOrRange function.
 * @param {boolean} options.ignoreNonVersions - Whether to ignore non-version strings.
 * @returns {string[]} - The filtered list of versions and ranges.
 */
const validateVersionsAndRanges = (
  input = throw new Error("'input' is required."),
  { ignoreNonVersions, ...options } = {}
) => versions.filter((input) =>
  validVersionOrRange(version) !== null
    ? true
    : (ignoreNonVersions === true
      ? false
      : throw new Error(`'${version}' is not a valid semver.`)))

export { validateVersionsAndRanges }
