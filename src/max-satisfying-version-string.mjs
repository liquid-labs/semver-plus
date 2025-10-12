import semver from 'semver'

import { filterValidVersions } from './filter-valid-versions'
import { compareHelper } from './lib/compare-helper'

/**
 * Like {@link maxVersion} but returns a string instead of a version object.
 * @param {string[]} versions - The versions to compare.
 * @param {object} options - The options to pass to the compareHelper function.
 * @param {boolean} options.ignoreNonVersions - Whether to ignore non-version strings.
 * @returns {string|null} - The maximum version string or null if no version strings are provided.
 */
const maxSatisfyingVersionString = (versions, { ignoreNonVersions } = {}) => {
  if (!versions || versions.length === 0) {
    return null
  }

  versions = filterValidVersions(versions, { ignoreNonVersions })

  return compareHelper(versions, semver.lt)
}

export { maxSatisfyingVersionString }