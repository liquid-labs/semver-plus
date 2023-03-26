import semver from 'semver'

import { STYLE_SEMVER, STYLE_TIMEVER } from './constants'
import { isTimeVersion } from './is-time-version'

const versionStyle = (version) => {
  const style = isTimeVersion(version) ? STYLE_TIMEVER : STYLE_SEMVER

  if (style === STYLE_SEMVER && !semver.valid(version)) {
    throw new Error(`Could not determine version type for '${version}'.`)
  }

  return style
}

export { versionStyle }