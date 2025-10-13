import semver from 'semver'

/**
 * Returns `true` if `v1` is greater than `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.gt function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is greater than `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const gt = semver.gt

/**
 * Returns `true` if `v1` is greater than or equal to `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.gte function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is greater than or equal to `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const gte = semver.gte

/**
 * Returns `true` if `v1` is less than `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.lt function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is less than `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const lt = semver.lt

/**
 * Returns `true` if `v1` is less than or equal to `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.lte function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is less than or equal to `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const lte = semver.lte

/**
 * Returns `true` if `v1` is equal to `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.eq function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is equal to `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const eq = semver.eq

/**
 * Returns `true` if `v1` is not equal to `v2`, `false` otherwise.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.neq function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {boolean} - `true` if `v1` is not equal to `v2`, `false` otherwise.
 * @category Comparison operations
 * @function
 */
export const neq = semver.neq

/**
 * Returns a number indicating whether a version is greater than, equal to, or less than another version.
 * @param {string} v1 - The first version to compare.
 * @param {string} comparator - The comparator to use. May be '<', '<=', '>', '>=', '=', '==', '!=', '===', or '!=='.
 * An exception is thrown if an invalid comparator is provided.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.cmp function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - A number indicating whether a version is greater than, equal to, or less than another version.
 * @category Comparison operations
 * @function
 */
export const cmp = semver.cmp

/**
 * Returns 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`. Will sort an array of versions in ascending order if
 * passed to `Array.sort()`.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.compare function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.
 * @category Comparison operations
 * @function
 */
export const compare = semver.compare

/**
 * Same as {@link compare} except it compares build if two versions are otherwise equal.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.compareBuild function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.
 * @category Comparison operations
 * @function
 */
export const compareBuild = semver.compareBuild

/**
 * Reverse of {@link compare}.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.rcompare function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {number} - 0 if `v1 == v2`, -1 if `v1 > v2`, and 1 if `v1 < v2`.
 * @category Comparison operations
 * @function
 */
export const rcompare = semver.rcompare

/**
 * Short for {@link compare} with `options.loose = true`.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @returns {number} - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.
 * @category Comparison operations
 * @function
 */
export const compareLoose = semver.compareLoose

/**
 * Returns the difference between two versions. I.e., the most significant version component by which `v1` and `v2`
 * differ.
 * @param {string} v1 - The first version to compare.
 * @param {string} v2 - The second version to compare.
 * @param {object} options - The options to pass to the semver.diff function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string|null} - `major`, 'minor', 'patch', 'prerelease', 'premajor', 'preminor', or 'prepatch' or null if
 * the `v1` and `v2` are identical (disregarding build metadata).
 * @category Comparison operations
 * @function
 */
export const diff = semver.diff

/**
 * Sorts an array of versions in ascending order using {@link compareBuild}.
 * @param {string[]} versions - The versions to sort.
 * @param {object} options - The options to pass to the semver.sort function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string[]} - The sorted versions.
 * @category Comparison operations
 * @function
 */
export const sort = semver.sort

/**
 * Sorts an array of versions in descending order using {@link compareBuild}.
 * @param {string[]} versions - The versions to sort.
 * @param {object} options - The options to pass to the semver.rsort function.
 * @param {boolean} options.loose - Allow non-conforming, but recognizable semver strings.
 * @returns {string[]} - The sorted versions.
 * @category Comparison operations
 * @function
 */
export const rsort = semver.rsort
