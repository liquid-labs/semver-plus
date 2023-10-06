import createError from 'http-errors'
import semver from 'semver'

import { STYLE_AUTO, STYLE_SEMVER, STYLE_TIMEVER } from './constants'
import { versionStyle } from './version-style'

const validIncrements = [
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch',
  'prerelease',
  'pretype',
  'alpha',
  'beta',
  'rc',
  'gold'
]
const validPrereleaseIncrements = ['prerelease', 'pretype', 'alpha', 'beta', 'rc', 'gold']
const validReleaseTypes = ['alpha', 'beta', 'rc', 'gold']

const makeTS = ({ date = new Date() } = {}) => {
  const timestamp = date.getUTCFullYear()
    + (date.getUTCMonth() + 1 + '').padStart(2, '0')
    + (date.getUTCDate() + '').padStart(2, '0')
    + '.'
    + (date.getUTCHours() + '').padStart(2, '0')
    + (date.getUTCMinutes() + '').padStart(2, '0')
    + (date.getUTCSeconds() + '').padStart(2, '0')
    + 'Z'

  return timestamp
}

/**
 * Given a current version, increment, and optional style, generates the next version string. The version style is
 * typically identified automatically but can be specified explicitly (if switching styles, for example). Supports
 * 'semver' and 'timever' style. See [semver specification](https://semver.org/). Timever style consists of:
 * - a major version integer (indicating compatibility series)
 * - a UTC timestamp in the form of 'YYYYMMDD.HHMMSSZ'
 * - the timestamp is generated during the execution of this method.
 *
 * For semver style, this method follows the [semver spec](https://semver.org) except that:
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
const nextVersion = ({ currVer, date, increment, style = STYLE_AUTO }) => {
  if (increment !== undefined && !validIncrements.includes(increment)) { throw createError.BadRequest(`Invalid increment '${increment}' specified.`) }
  // what are we incrementing? default is patch for released and prerelease for pre-release projects
  increment = increment || (currVer.match(/^[\d.Z-]+$/) ? 'patch' : 'prerelease')

  let nextVer
  // determine concrete value for increment
  let currPrerelease = currVer.replace(/^[\d.Z]+-([0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*?)(?:\.\d+)?/, '$1')
  if (currPrerelease === currVer) currPrerelease = null
  else if (!validReleaseTypes.includes(currPrerelease)) {
    throw createError.BadRequest(`Cannot handle unsupported pre-release '${currPrerelease}'. Prerelease ID must be one of 'alpha', 'beta', or 'rc'.`)
  }

  if (currPrerelease === null && validPrereleaseIncrements.includes(increment)) {
    throw createError.BadRequest(`Cannot increment ${increment} for non-prerelease versions.`)
  }
  if (currPrerelease !== null && !validPrereleaseIncrements.includes(increment)) {
    throw createError.BadRequest(`Prerelease version ${currVer} can only be incremented by 'prerelease' or 'pretype'.`)
  }

  if (style === STYLE_AUTO || style === undefined) {
    style = versionStyle(currVer)
  }

  // alpha -> beta -> rc
  if (increment === 'pretype') {
    if (currPrerelease === 'alpha') nextVer = currVer.replace(/([0-1.Z-]+)alpha(\.\d+)?/, '$1beta.0')
    else if (currPrerelease === 'beta') nextVer = currVer.replace(/([0-1.Z-]+)beta(\.\d+)?/, '$1rc.0')
    else if (currPrerelease === 'rc') { // is special in the case of timever + pretype
      if (style === STYLE_SEMVER) {
        nextVer = currVer.replace(/([0-1.Z]+)-rc(?:\.\d+)?/, '$1')
      }
      else {
        nextVer = currVer.replace(/(\d+)\.\d{8}\.\d{6}Z-rc\.\d+/, '$1.' + makeTS())
      }
    }

    return nextVer // we're done
  }
  else if (validReleaseTypes.includes(increment)) {
    const currReleasePosition = currPrerelease === null
      ? validReleaseTypes.indexOf('gold')
      : validReleaseTypes.indexOf(currPrerelease)
    const incrementPosition = validReleaseTypes.indexOf(increment)
    if (incrementPosition <= currReleasePosition) {
      throw createError.BadRequest(`Cannot move release type backwards from ${currPrerelease || 'gold'} to ${increment}.`)
    }

    if (increment === 'gold') {
      if (style === STYLE_SEMVER) {
        nextVer = currVer.replace(/^([\d.Z]+)-(?:alpha|beta|rc)(?:\.\d+)?/, '$1')
      }
      else { // style === STYLE_TIMEVER
        nextVer = currVer.replace(/(\d+)\.\d{8}\.\d{6}Z-(?:alpha|beta|rc)\.\d+/, '$1.' + makeTS())
      }
    }
    else if (style === STYLE_SEMVER) {
      nextVer = currVer.replace(/^([\d.Z-]+)(?:alpha|beta|rc)(?:\.\d+)?/, `$1${increment}.0`)
    }
    else { // style === STYLE_TIMEVER
      nextVer = currVer.replace(/(\d+)\.\d{8}\.\d{6}Z-(?:alpha|beta|rc)\.\d+/, '$1.' + makeTS() + increment + '.0')
    }

    return nextVer
  }

  if (style === STYLE_SEMVER) {
    // if we're going 'pre', but currVer is a pre-style, then we need to specify the first stage in the pre, aka, alpha
    nextVer = increment.startsWith('pre') && currVer.match(/^[\d.Z-]+$/)
      ? semver.inc(currVer, increment, 'alpha')
      : semver.inc(currVer, increment)
  }
  else { // it's 'timever' style
    const timestamp = makeTS({ date })

    const [currMajor] = currVer.split('.')
    const nextMajor = increment === 'major' || increment === 'premajor' ? '' + (parseInt(currMajor) + 1) : currMajor
    if (currPrerelease === null && increment.startsWith('pre')) {
      nextVer = nextMajor + '.' + timestamp + '-alpha.0'
    }
    else if (currPrerelease !== null && increment === 'prerelease') {
      const currPreReleaseString = (currVer.match(/(?:alpha|beta|rc)\.(\d+)$/) || [null, null])[1]
      const currPreRelease = parseInt(currPreReleaseString)
      const currBare = currVer.replace(/\d+$/, '')
      nextVer = currBare + (currPreRelease + 1)
    }
    else {
      nextVer = nextMajor + '.' + timestamp + (currPrerelease ? '-' + currPrerelease : '')
    }
  }

  return nextVer
}

export { makeTS, nextVersion, STYLE_AUTO, STYLE_TIMEVER, STYLE_SEMVER }
