import semver from 'semver'

import { STYLE_AUTO, STYLE_SEMVER } from './constants'
import { isTimeVersion } from './is-time-version'
import { versionStyle } from './version-style'

const compareHelper = ({ semverTest, style, timeverTest, versions }) => {
  let currLead
  for (let i = 0; i < versions.length; i += 1) {
    const testVer = versions[i]
    if (currLead === undefined) {
      currLead = testVer
    }
    else if (style === STYLE_SEMVER) {
      if (semverTest(currLead, testVer)) {
        currLead = testVer
      }
    }
    else {
      if (timeverTest(currLead, testVer)) {
        currLead = testVer
      }
    }
  }

  return currLead
}

const maxVersion = ({ ignoreNonVersions, style, versions }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  ([style, versions] = styleValidator({ ignoreNonVersions, style, versions }))

  return compareHelper({ semverTest : semver.lt, style, timeverTest : (a, b) => a.localeCompare(b) < 0, versions })
}

const minVersion = ({ ignoreNonVersions, style, versions }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  ([style, versions] = styleValidator({ ignoreNonVersions, style, versions }))

  return compareHelper({ semverTest : semver.gt, style, timeverTest : (a, b) => a.localeCompare(b) > 0, versions })
}

const styleValidator = ({ ignoreNonVersions, style, versions }) => {
  if (style === STYLE_AUTO || style === undefined) {
    style = versions.reduce((res, v) => {
      try {
        if (res !== undefined) {
          return res
        }
        else {
          return versionStyle(v)
        }
      }
      catch (e) {
        if (ignoreNonVersions === true) {
          return undefined
        }
        else {
          throw e
        }
      }
    }, undefined)
    
  }

  versions = versions.filter((version) => {
    const valid = style === STYLE_SEMVER
      ? semver.valid(version) !== null
      : isTimeVersion(version)

    if (valid === false) {
      if (ignoreNonVersions === true) {
        return false
      }
      else {
        throw new Error(`Version style mis-match; initial version of style '${style}', but '${version}' is not valid for that style.`)
      }
    }

    return true
  })

  return [style, versions]
}

export { maxVersion, minVersion }
