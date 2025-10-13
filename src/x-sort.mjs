import semver from 'semver'

import { xRangeRE } from './constants'
import { upperBound } from './upper-bound'

/**
 * Ascend sorts a mix of semver versions and x-range specified ranges (e.g., 1.2.* or 1.2.x). The ranges are sorted according to their highest version; e.g., 1.3.34 < 1.3.*. (I believe it can accept caret ranges too, but I would need to review the spec.)
 * @param {string[]} versionsAndRanges - The versions and ranges to sort.
 * @returns {string[]} - The sorted versions and ranges.
 * @category Comparison operations
 */
const xSort = (versionsAndRanges) => {
  // TODO: to sort any range type, develop 'minOutOfRange' and use those to sort ranges
  const versions = []
  const ranges = []

  // filter out duplicates
  versionsAndRanges = versionsAndRanges.filter((v, i, a) => i === a.indexOf(v))

  for (const versionOrRange of versionsAndRanges) {
    if (versionOrRange.match(xRangeRE)) {
      ranges.push(versionOrRange)
    }
    else {
      const version = semver.valid(versionOrRange)
      if (version !== null) {
        versions.push(versionOrRange)
      }
      else {
        const range = semver.validRange(versionOrRange)
        if (range !== null) {
          ranges.push(versionOrRange)
        }
        else {
          throw new Error(`Input '${versionOrRange}' is neither a version nor version range.`)
        }
      }
    }
  }

  const sortedVersions = versions.sort(semver.compare)

  const sortedRanges = ranges.sort((a, b) => {
    const firstPastA = upperBound(a, { stripOperators : true })
    const firstPastB = upperBound(b, { stripOperators : true })

    if (firstPastA === '*') {
      return 1
    }
    else if (firstPastB === '*') {
      return -1
    }
    else if (firstPastA === null && firstPastB === null) {
      return 0
    }
    else if (firstPastA === null) {
      return 1
    }
    else if (firstPastB === null) {
      return -1
    }
    else {
      return semver.compare(firstPastA, firstPastB)
    }
  })

  if (sortedVersions.length === 0) {
    return sortedRanges
  }
  else if (sortedRanges.length === 0) {
    return sortedVersions
  }

  const allSorted = [...versions]

  let allRangesGreater = false
  for (const range of sortedRanges) {
    if (allRangesGreater === true) {
      allSorted.push(range)
      continue
    }

    const lastVersion = semver.maxSatisfying(sortedVersions, range)
    if (lastVersion !== null) {
      const indexOfLastVersion = allSorted.indexOf(lastVersion)
      // we may have already inserted a range, so we need to find where the possible sequence of ranges ends and the
      // next version begins (because ranges are sorted, we want to insert our range at the end of the sequence of
      // ranges, if any).
      const nextVersionOffset = allSorted.slice(indexOfLastVersion + 1).findIndex((vOrR) => semver.valid(vOrR))
      if (nextVersionOffset === -1) {
        allSorted.push(range)
        allRangesGreater = true
      }
      else {
        allSorted.splice(indexOfLastVersion + 1 + nextVersionOffset, 0, range)
      }
    }
    else if (semver.gtr(sortedVersions[0], range)) {
      const indexOfLowestRange = allSorted.indexOf(sortedVersions[0])
      allSorted.splice(indexOfLowestRange, 0, range)
    }
    else if (semver.ltr(sortedVersions[sortedVersions.length - 1], range)) {
      allSorted.push(range)
      allRangesGreater = true
    }
  }

  return allSorted
}

export { xSort }
