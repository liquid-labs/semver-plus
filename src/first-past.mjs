import semver from 'semver'

import { prereleaseXRangeRE } from './constants'
import { minVersion } from './min-version'
import { nextVersion } from './next-version'

const firstPast = (range) => {
  const rangeMin = minVersion(range)

  const nextMajor = nextVersion({ currVer : rangeMin, increment : 'major', loose : true })
  const nextMajorValid = semver.satisfies(nextMajor, range)
  if (nextMajorValid) {
    return null
  }

  const nextMinor = nextVersion({ currVer : rangeMin, increment : 'minor', loose : true })
  const nextMinorValid = semver.satisfies(nextMinor, range)
  if (nextMinorValid === true) {
    return nextMajor
  }

  const nextPatch = nextVersion({ currVer : rangeMin, increment : 'patch', loose : true })
  const nextPatchValid = semver.satisfies(nextPatch, range)
  if (nextPatchValid === true) {
    return nextMinor
  }

  if (range.match(prereleaseXRangeRE)) {
    const nextReleaseType = nextVersion({ currVer : rangeMin, increment : 'pretype' })
    return nextReleaseType
  }

  // else
  throw new Error(`Cannot determine first-past version for range: '${range}'.`)
}

export { firstPast }
