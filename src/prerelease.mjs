import semver from 'semver'

import { TIMEVER_REGEX, TIMEVER_PRETYPE_POS, TIMEVER_PREVER_POS } from './constants'
import { isTimeVersion } from './is-time-version'

const prerelease = (version) => {
  if (isTimeVersion(version)) {
    const match = version.match(TIMEVER_REGEX)
    const preType = match[TIMEVER_PRETYPE_POS]
    if (preType !== undefined) {
      return [preType, parseInt(match[TIMEVER_PREVER_POS])]
    }
    else return null
  }
  else {
    return semver.prerelease(version)
  }
}

export { prerelease }
