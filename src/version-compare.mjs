import semver from 'semver'

const compareHelper = ({ semverTest, timeverTest, versions }) => {
  let currLead
  for (let i = 0; i < versions.length; i += 1) {
    const testVer = versions[i]
    if (currLead === undefined) {
      currLead = testVer
    }
    else if (semverTest(currLead, testVer)) {
      currLead = testVer
    }
  }

  return currLead
}

const maxVersion = ({ ignoreNonVersions, versions }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  versions = filterValidVersions(versions,{ ignoreNonVersions })

  return compareHelper({ semverTest : semver.lt, timeverTest : (a, b) => a.localeCompare(b) < 0, versions })
}

const minVersion = ({ ignoreNonVersions, versions }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  versions = filterValidVersions(versions, { ignoreNonVersions })

  return compareHelper({ semverTest : semver.gt, timeverTest : (a, b) => a.localeCompare(b) > 0, versions })
}

const filterValidVersions = (versions, { ignoreNonVersions }) => {
  versions = versions.filter((version) => {
    const valid = semver.valid(version) !== null

    if (valid === false) {
      if (ignoreNonVersions === true) {
        return false
      }
      else {
        throw new Error(`'${version}' is not a valid semver.`)
      }
    }

    return true
  })

  return versions
}

export { maxVersion, minVersion }
