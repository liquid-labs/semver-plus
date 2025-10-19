import createError from 'http-errors'
import semver from 'semver'

import {
  STANDARD_INCREMENTS,
  STANDARD_PRERELEASE_INCREMENTS,
  STANDARD_PRERELEASE_NAMES,
  STANDARD_RELEASE_NAMES
} from './ext-constants'

/**
 * Given a current version generates the next version string accourding to `increment`. This method is similar to
 * {@link inc} from the [base semver library](https://semver.org) with two differences.
 * 1) It supports a specific pre-release sequence prototype -> 'alpha' -> 'beta' -> 'rc' -> released and the 'pretype'
 *    increment will advance the prerelease ID through these stages.
 * 2) The 'prerelease' increment can only be used to advance the prerelease version number and does not function as
 *    'prepatch' on a non-prerelease version.
 * @param {string} currVer - The current version to increment.
 * @param {string} increment - The increment to use.
 * @returns {string} - The next version string.
 * @category Version operations
 */
const nextVersion = (currVer, increment) => {
  if (!semver.valid(currVer)) {
    const msg = `Invalid version '${currVer}'` + (semver.validRange(currVer) ? '; range not allowed.' : '.')
    throw createError.BadRequest(msg)
  }

  if (increment !== undefined && !STANDARD_INCREMENTS.includes(increment)) {
    throw createError.BadRequest(`Invalid increment '${increment}' specified.`)
  }
  const semverTupleREString = '(?:[0-9]|[1-9][0-9]+)'
  const isProductionVersion = !!currVer.match(new RegExp(`^(?:${semverTupleREString}\\.){2}${semverTupleREString}$`))
  // what are we incrementing? default is patch for production and prerelease for pre-release projects
  increment = increment || (isProductionVersion ? 'patch' : 'prerelease')

  let nextVer
  // determine concrete value for increment
  // `semver.prerelease(currVer)` extracts an array of components; we just want a string
  const currPrereleaseComponents = semver.prerelease(currVer)
  const currPrerelease = currPrereleaseComponents === null ? null : currPrereleaseComponents.join('.')
  // const stdPrereleaseMatch = currVer.match(/^[\d.Z]+-(?!\d\.\d+$)([0-9A-Za-z-]+)\.\d+)$/)
  // const
  const stdPrereleaseMatch = currPrerelease === null ? null : currPrerelease.match(/^(?!\d+\.\d+$)(?:([0-9A-Za-z-]+)\.)?\d+$/)
  const standardPrereleaseName = stdPrereleaseMatch === null
    ? null
    : (stdPrereleaseMatch[1] === undefined ? '' : stdPrereleaseMatch[1])
  const isStandardCurrPrerelease = STANDARD_PRERELEASE_NAMES.includes(standardPrereleaseName)

  // now verify the combination of inputs
  if (increment === 'pretype' && !STANDARD_PRERELEASE_NAMES.includes(standardPrereleaseName)) {
    throw createError.BadRequest(`Cannot increment type of unknown prerelease type '${currPrerelease}'. Can only increment '${STANDARD_PRERELEASE_NAMES.join(', -> ')}'.`)
  }
  if (increment === 'prerelease' && standardPrereleaseName === null) {
    throw createError.BadRequest(`Cannot increment non-standard prerelease version '${currPrerelease}'. Use '<tag>.<number>' where tag is alphanumeric+dashes (but not all digits).`)
  }
  else if (isStandardCurrPrerelease === true && STANDARD_PRERELEASE_NAMES.includes(increment)) { // implies `standardPrereleaseName !== undefined`
    const currIndex = STANDARD_PRERELEASE_NAMES.indexOf(standardPrereleaseName)
    const incrementIndex = STANDARD_PRERELEASE_NAMES.indexOf(increment)
    if (incrementIndex <= currIndex) {
      throw createError.BadRequest(`Cannot move prerelease name from '${standardPrereleaseName}' to '${increment}'. Prerelease types must move forward.`)
    }
  }
  else if (isProductionVersion && STANDARD_PRERELEASE_INCREMENTS.includes(increment)) {
    throw createError.BadRequest(`Cannot use increment '${increment}' with production versions. Use 'premajor', 'preminor', or 'prepatch'.`)
  }
  else if (!isProductionVersion && !STANDARD_PRERELEASE_INCREMENTS.includes(increment)) {
    throw createError.BadRequest(`Cannot use increment '${increment}' with pre-release versions. Use '${STANDARD_PRERELEASE_INCREMENTS.join(', ')}'.`)
  }

  // alpha -> beta -> rc; valid states verified above
  if (increment === 'pretype') {
    if (standardPrereleaseName === 'alpha') nextVer = currVer.replace(/([0-1.Z-]+)alpha(\.\d+)?/, '$1beta.0')
    else if (standardPrereleaseName === 'beta') nextVer = currVer.replace(/([0-1.Z-]+)beta(\.\d+)?/, '$1rc.0')
    else if (standardPrereleaseName === 'rc') {
      nextVer = currVer.replace(/([0-9.Z]+)-rc(?:\.\d+)?/, '$1')
    }

    return nextVer // we're done
  }
  else if (STANDARD_RELEASE_NAMES.includes(increment)) {
    if (increment === 'gold') {
      nextVer = currVer.replace(/^([\d.]+)-(?:alpha|beta|rc)(?:\.\d+)?/, '$1')
    }
    else {
      nextVer = currVer.replace(/^([\d.]+)-(?:alpha|beta|rc)(?:\.\d+)?/, `$1-${increment}.0`)
    }

    return nextVer
  }
  else if (increment !== 'prerelease' && increment.startsWith('pre')) {
    // then it's 'premajor', 'preminor', 'prepatch'
    return semver.inc(currVer, increment, 'alpha')
  }
  // else, it's a standard semver increment
  return semver.inc(currVer, increment)
  /*
  // if we're going 'pre', but currVer is a pre-style, then we need to specify the first stage in the pre, aka, alpha
  nextVer = increment.startsWith('pre') && currVer.match(/^[\d.Z-]+$/)
    ? semver.inc(currVer, increment, 'alpha')
    : semver.inc(currVer, increment)

  return nextVer */
}

export { nextVersion }
