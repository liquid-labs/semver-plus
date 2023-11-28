import semver from 'semver'

import { prereleaseXRangeRE } from './constants'

const minVersion = (range) => {
  // this has to come first because weirds, 'semver.validRange' recognizes 1.0.0-alpha.x (but not '.*'?!), but
  // 'semver.minVersion' does not return correct results
  if (range.match(prereleaseXRangeRE)) {
    return range.slice(0, -1) + '0'
  }
  else {
    const semverRange = semver.validRange(range)
    if (semverRange !== null) {
      return semver.minVersion(semverRange).version
    }
  }
  // else
  throw new Error(`Invaid range '${range}'.`)
}

export { minVersion }
