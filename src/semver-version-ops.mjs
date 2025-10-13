import semver from 'semver'

/**
 * Returns a parsed, normalized version string or null if the version is invalid.
 * @param {string} version - The version to parse.
 * @param {object} options - The options to pass to the semver.valid function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.includePrerelease - Whether to include prerelease versions.
 * @returns {string|null} - The parsed, normalized version string or null if the version is invalid.
 * @category Version operations
 * @function
 */
export const valid = semver.valid

/**
 * Returns a new version string incremented by the specified part.
 * @param {string} version - The version to increment.
 * @param {string} increment - The increment to use.
 * @param {object} options - The options to pass to the semver.inc function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.includePrerelease - Whether to include prerelease versions.
 * @param {string} identifier - Used to specify the prerelease name for prerelease increments.
 * @param {false|0|1} identifierBase - When incrementing to a new prerelease name, specifies the base number or
 * `false` for no number.
 * @returns {string} - The new version string.
 * @category Version operations
 * @function
 */
export const inc = semver.inc

/**
 * Returns an array of prerelease components or `null` if the version is not a prerelease. A 'component' is just a '.'
 * separated string.
 * @param {string} version - The version to parse.
 * @param {object} options - The options to pass to the semver.inc function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string[]|null} - The prerelease components or `null` if the version is not a prerelease.
 * @category Version operations
 * @function
 */
export const prerelease = semver.prerelease

/**
 * Returns the major version number.
 * @param {string} version - The version to parse.
 * @param {object} options - The options to pass to the semver.major function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - The major version number.
 * @category Version operations
 * @function
 */
export const major = semver.major

/**
 * Returns the minor version number.
 * @param {string} version - The version to parse.
 * @param {object} options - The options to pass to the semver.minor function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - The minor version number.
 * @category Version operations
 * @function
 */
export const minor = semver.minor

/**
 * Returns the patch version number.
 * @param {string} version - The version to parse.
 * @param {object} options - The options to pass to the semver.patch function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - The patch version number.
 * @category Version operations
 * @function
 */
export const patch = semver.patch

/**
 * Attempts to parse and normalize a string as a semver string. An aliase for {@link valid}.
 * @category Version operations
 * @function
 */
export const parse = semver.parse

/**
 * Aggressively attempts to coerce a string into a valid semver string. Basically, starting from the left side of the
 * string, it looks for a digit and then includes anything to the right of the digit that looks like part of a semver.
 * So, 'Number 1!' -> '1.0.0', 'Upgrade 1.2 to 1.3' -> '1.2.0', etc.
 * @param {string} version - The version to coerce.
 * @param {object} options - The options to pass to the semver.coerce function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @param {boolean} options.includePrerelease - Unless true, prerelease tags (and build metadata) are stripped. If
 * @param {boolean} options.rtl - Instead of searching for a digit from the left, start searching from the right.
 * true, then they are preserved.
 * @returns {string|null} - The coerced version string or null if the version is invalid.
 * @category Version operations
 * @function
 */
export const coerce = semver.coerce

/**
 * Returns a cleaned version string removing unecessary comparators and, if `options.loose` is true, fixing space
 * issues. Only works for versions, not ranges.
 * @param {string} version - The version to clean.
 * @param {object} options - The options to pass to the semver.clean function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string|null} - The cleaned version string or null if the version is invalid.
 * @category Version operations
 * @function
 */
export const clean = semver.clean
