import semver from 'semver'

import { nextVersion } from './next-version'

const xSort = (versionsAndRanges) => {
  const versions = []
  const ranges = []

  // filter out duplicates
  versionsAndRanges = versionsAndRanges.filter((v, i, a) => i === a.indexOf(v))

  for (const versionOrRange of versionsAndRanges) {
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

  const sortedVersions = versions.sort(semver.compare)

  const sortedRanges = ranges.sort((a, b) => {
    // '*' is a special case since it's min is zero and it's max is infinite
    if (semver.validRange(a) === '*') { return 1 } // semver.validRange normalizes '*' equivs to '*'
    else if (semver.validRange(b) === '*') { return -1 }

    const aMin = semver.minVersion(a).version
    const bMin = semver.minVersion(b).version

    const minCompare = semver.compare(aMin, bMin)
    if (minCompare !== 0) {
      return minCompare
    }
    else {
      const nextMajorAValid = semver.satisfies(nextVersion({ currVer : aMin, increment : 'major' }), a)
      const nextMajorBValid = semver.satisfies(nextVersion({ currVer : bMin, increment : 'major' }), b)
      if (nextMajorAValid === true && nextMajorBValid === true) { return 0 }
      else if (nextMajorAValid === true) { return 1 }
      else if (nextMajorBValid === true) { return -1 }
      // else, let's test minor
      const nextMinorAValid = semver.satisfies(nextVersion({ currVer : aMin, increment : 'minor' }), a)
      const nextMinorBValid = semver.satisfies(nextVersion({ currVer : bMin, increment : 'minor' }), b)
      if (nextMinorAValid === true && nextMinorBValid === true) { return 0 }
      else if (nextMinorAValid === true) { return 1 }
      else if (nextMinorBValid === true) { return -1 }
      // else, let's test patch
      const nextPatchAValid = semver.satisfies(nextVersion({ currVer : aMin, increment : 'patch' }), a)
      const nextPatchBValid = semver.satisfies(nextVersion({ currVer : bMin, increment : 'patch' }), b)
      if (nextPatchAValid === true && nextPatchBValid === true) { return 0 }
      else if (nextPatchAValid === true) { return 1 }
      else if (nextPatchBValid === true) { return -1 }
      // else, it's a pre-release shoot out
      const prePartA = semver.prerelease(a)[0]
      const prePartB = semver.prerelease(b)[0]

      console.log('prePartA:', prePartA) // DEBUG
      return prePartA.localeCompare(prePartB)
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
    else if (semver.ltr(sortedVersions[0], range)) {
      const indexOfLowestRange = allSorted.indexOf(sortedVersions[0])
      allSorted.splice(indexOfLowestRange, 0, range)
    }
    else if (semver.gtr(sortedVersions[sortedVersions.length - 1], range)) {
      allSorted.push(range)
      allRangesGreater = true
    }
  }

  return allSorted
}

export { xSort }
