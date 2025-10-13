import semver from 'semver'

// note `minVersion` is overriden and defined in `min-version.mjs`

/**
 * Returns a parsed, normalized range string or null if the range is invalid.
 * @param {string} range - The range to parse.
 * @param {object} options - The options to pass to the semver.validRange function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string|null} - The parsed, normalized range string or null if the range is invalid.
 * @category Range operations
 * @function
 */
export const validRange = semver.validRange

/**
 * Returns `true` if the version satisfies the range, `false` otherwise.
 * @param {string} version - The version to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.satisfies function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if the version satisfies the range, `false` otherwise.
 * @category Range operations
 * @function
 */
export const satisfies = semver.satisfies

/**
 * Returns the highest version in `versions` that satisfies the range, or null if no version satisfies the range.
 * @param {string[]} versions - The versions to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.maxSatisfying function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string|null} - The highest version that satisfies the range, or null if no version satisfies the range.
 * @category Range operations
 * @function
 */
export const maxSatisfying = semver.maxSatisfying

/**
 * Returns the lowest version in `versions` that satisfies the range, or null if no version satisfies the range.
 * @param {string[]} versions - The versions to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.minSatisfying function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string|null} - The lowest version that satisfies the range, or null if no version satisfies the range.
 * @category Range operations
 * @function
 */
export const minSatisfying = semver.minSatisfying

/**
 * Returns `true` if `version` is greater than is greater than any version in `range`, `false` otherwise.
 * @param {string} version - The version to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.gtr function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `version` is greater than is greater than any version in `range`, `false` otherwise.
 * @category Range operations
 * @function
 */
export const gtr = semver.gtr

/**
 * Returns `true` if `version` is less than is less than any version in `range`, `false` otherwise.
 * @param {string} version - The version to check.
 * @param {string} range - The range to check.
 * @param {object} options - The options to pass to the semver.ltr function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `version` is less than is less than any version in `range`, `false` otherwise.
 * @category Range operations
 * @function
 */
export const ltr = semver.ltr

/**
 * Returns `true` if `version` is outside of `range` in the indicated direction, `false` otherwise. `outside(v, r, '>)`
 * is equivalent to `gtr(v, r)`.
 * @param {string} version - The version to check.
 * @param {string} range - The range to check.
 * @param {string} direction - The direction to check. Must be '>' or '<'.
 * @param {object} options - The options to pass to the semver.outside function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `version` is outside of `range` in the indicated direction, `false` otherwise.
 * @category Range operations
 * @function
 */
export const outside = semver.outside

/**
 * Returns `true` if any of the comparators in the range intersect with each other.
 * @param {string} range - The first version range or comparator.
 * @param {object} options - The options to pass to the semver.intersects function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if any of the comparators in the range intersect with each other, `false` otherwise.
 * @category Range operations
 * @function
 */
export const intersects = semver.intersects

/**
 * Return a "simplified" range that matches the same items in the versions list as the range specified. Note that it
 * does not guarantee that it would match the same versions in all cases, only for the set of versions provided. This
 * is useful when generating ranges by joining together multiple versions with || programmatically, to provide the user
 * with something a bit more ergonomic. If the provided range is shorter in string-length than the generated range,
 * then that is returned.
 * @param {string[]} versions - The versions to check.
 * @param {string} range - The range to simplify.
 * @param {object} options - The options to pass to the semver.simplifyRange function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string} - The simplified range.
 * @category Range operations
 * @function
 */
export const simplifyRange = semver.simplifyRange

/**
 * Returns `true` if `subRange` is a subset of `superRange`, `false` otherwise.
 * @param {string} subRange - The sub-range to check.
 * @param {string} superRange - The super-range to check.
 * @param {object} options - The options to pass to the semver.subset function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `subRange` is a subset of `superRange`, `false` otherwise.
 * @category Range operations
 * @function
 */
export const subset = semver.subset
