import createError from 'http-errors'
import semver from 'semver'

const STYLE_SEMVER = 'semver'
const STYLE_TIMEVER = 'timever'
const STYLE_AUTO = 'auto'

const validIncrements = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease', 'pretype']

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
  let currType = currVer.replace(/^[\d.Z-]+(alpha|beta|rc)(?:\.\d+)?/, '$1')
  if (currType === currVer) currType = null

  if (currType === null && increment === 'prerelease') { throw createError.BadRequest('Cannot increment prerelease for non-prerelease versions.') }
  if (currType !== null && !(increment === 'prerelease' || increment === 'pretype')) { throw createError.BadRequest(`Prerelease version ${currVer} can only be incremented by 'prerelease' or 'pretype'.`) }

  if (style === STYLE_AUTO || style === undefined) {
    style = currVer.match(/\d{6}Z(?:-(?:alpha|beta|rc)\.\d+)?$/) ? STYLE_TIMEVER : STYLE_SEMVER
  }

  // alpha -> beta -> rc
  if (increment === 'pretype') {
    if (currType === 'alpha') nextVer = currVer.replace(/([0-1.Z-]+)alpha(\.\d+)?/, '$1beta.0')
    else if (currType === 'beta') nextVer = currVer.replace(/([0-1.Z-]+)beta(\.\d+)?/, '$1rc.0')
    else if (currType === 'rc') { // is special in the case of timever + pretype
      if (style === STYLE_SEMVER) {
        nextVer = currVer.replace(/([0-1.Z]+)-rc(?:\.\d+)?/, '$1')
      }
      else {
        nextVer = currVer.replace(/(\d+)\.\d{8}\.\d{6}Z-rc\.\d+/, '$1.' + makeTS())
      }
    }
    else throw createError.InternalServerError(`Failed to increment prerelease type. Prerelease ID must be one of 'alpha', 'beta', or 'rc'. (${currVer}/${currType}/${increment})`)

    return nextVer // we're done
  }

  if (style === STYLE_SEMVER) {
    nextVer = increment.startsWith('pre')
      ? semver.inc(currVer, increment, 'alpha')
      : semver.inc(currVer, increment)
  }
  else { // it's 'timever' style
    const timestamp = makeTS({ date })

    const [currMajor] = currVer.split('.')
    const nextMajor = increment === 'major' || increment === 'premajor' ? '' + (parseInt(currMajor) + 1) : currMajor
    if (currType === null && increment.startsWith('pre')) {
      nextVer = nextMajor + '.' + timestamp + '-alpha.0'
    }
    else if (currType !== null && increment === 'prerelease') {
      const currPreReleaseString = (currVer.match(/(?:alpha|beta|rc)\.(\d+)$/) || [null, null])[1]
      const currPreRelease = parseInt(currPreReleaseString)
      const currBare = currVer.replace(/\d+$/, '')
      nextVer = currBare + (currPreRelease + 1)
    }
    else {
      nextVer = nextMajor + '.' + timestamp + (currType ? '-' + currType : '')
    }
  }

  return nextVer
}

export { makeTS, nextVersion, STYLE_AUTO, STYLE_TIMEVER, STYLE_SEMVER }
