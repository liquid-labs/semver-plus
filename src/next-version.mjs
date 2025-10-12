import createError from 'http-errors'
import semver from 'semver'

import { increments, prereleaseIncrements, releaseTypes } from './ext-constants'

/**
 * Given a current version, increment generates the next version string. This method follows the
 * [semver spec](https://semver.org) except that:
 * - `increment` 'prerelease' cannot be used with non-prerelease versions (results in execption)
 * - supports 'pretype' and specific pre-release sequence 'alpha' -> 'beta' -> 'rc' -> released
 *
 * #### Parameters
 * - `currVer`: the current version to increment.
 * - `increment`: what to inrement; may be: 'major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch',
 *   'prerelease', or 'pretype'. The first seven are defined by the [semver spec](https://semver.org) and 'pretype'
 *    means to increment the pre-release ID from 'alpha' -> 'beta' -> 'rc' -> none. Passing in a `currVer` with any
 *    other prerelease ID with a 'pretype' increment will result in undefined results
 */
const nextVersion = ({ currVer, increment, loose = false }) => {
  if (increment !== undefined && !increments.includes(increment)) {
    throw createError.BadRequest(`Invalid increment '${increment}' specified.`)
  }
  // what are we incrementing? default is patch for released and prerelease for pre-release projects
  increment = increment || (currVer.match(/^[\d.Z-]+$/) ? 'patch' : 'prerelease')

  let nextVer
  // determine concrete value for increment
  let currPrerelease = currVer.replace(/^[\d.Z]+-([0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*?)(?:\.\d+)?/, '$1')
  if (currPrerelease === currVer) currPrerelease = null
  else if (!releaseTypes.includes(currPrerelease)) {
    throw createError.BadRequest(`Cannot handle unsupported pre-release '${currPrerelease}'. Prerelease ID must be one of 'alpha', 'beta', or 'rc'.`)
  }

  if (currPrerelease === null && prereleaseIncrements.includes(increment)) {
    throw createError.BadRequest(`Cannot increment ${increment} for non-prerelease versions.`)
  }
  if (currPrerelease !== null && !prereleaseIncrements.includes(increment)) {
    if (loose === true) {
      currVer = nextVersion(({ currVer, increment : 'gold' }))
      currPrerelease = undefined
    }
    else {
      throw createError.BadRequest(`Prerelease version ${currVer} can only be incremented by 'prerelease' or 'pretype'.`)
    }
  }

  // alpha -> beta -> rc
  if (increment === 'pretype') {
    if (currPrerelease === 'alpha') nextVer = currVer.replace(/([0-1.Z-]+)alpha(\.\d+)?/, '$1beta.0')
    else if (currPrerelease === 'beta') nextVer = currVer.replace(/([0-1.Z-]+)beta(\.\d+)?/, '$1rc.0')
    else if (currPrerelease === 'rc') { // is special in the case of timever + pretype
      nextVer = currVer.replace(/([0-9.Z]+)-rc(?:\.\d+)?/, '$1')
    }

    return nextVer // we're done
  }
  else if (releaseTypes.includes(increment)) {
    const currReleasePosition = currPrerelease === null
      ? releaseTypes.indexOf('gold')
      : releaseTypes.indexOf(currPrerelease)
    const incrementPosition = releaseTypes.indexOf(increment)
    if (incrementPosition <= currReleasePosition) {
      throw createError.BadRequest(`Cannot move release type backwards from ${currPrerelease || 'gold'} to ${increment}.`)
    }

    if (increment === 'gold') {
      nextVer = currVer.replace(/^([\d.Z]+)-(?:alpha|beta|rc)(?:\.\d+)?/, '$1')
    }
    else {
      nextVer = currVer.replace(/^([\d.Z-]+)(?:alpha|beta|rc)(?:\.\d+)?/, `$1${increment}.0`)
    }

    return nextVer
  }

  // if we're going 'pre', but currVer is a pre-style, then we need to specify the first stage in the pre, aka, alpha
  nextVer = increment.startsWith('pre') && currVer.match(/^[\d.Z-]+$/)
    ? semver.inc(currVer, increment, 'alpha')
    : semver.inc(currVer, increment)

  return nextVer
}

export { nextVersion }
