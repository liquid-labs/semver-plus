import semver from 'semver'

import { STYLE_AUTO, STYLE_SEMVER, STYLE_TIMEVER } from './constants'
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

const maxVersion = ({ versions, style }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  style = styleValidator({ versions, style })

  return compareHelper({ semverTest: semver.lt, style, timeverTest : (a, b) => a.localeCompare(b) < 0, versions })
}

const minVersion = ({ versions, style }) => {
  if (!versions || versions.length === 0) {
    return null
  }

  style = styleValidator({ versions, style })

  return compareHelper({ semverTest: semver.gt, style, timeverTest : (a, b) => a.localeCompare(b) > 0, versions })
}

const styleValidator = ({ versions, style }) => {
  if (style === STYLE_AUTO || style === undefined) {
    style = versionStyle(versions[0])
  }

  for (const version of versions) {
    const valid = style === STYLE_SEMVER
      ? semver.valid(version)
      : isTimeVersion(version)

    if (valid === false) {
      throw new Error(`Version style mis-match; initial version of style '${style}', but '${version}' is not valid for that style.`)
    }
  }

  return style
}

export { maxVersion, minVersion }