import semver from 'semver'

import { xRangeRE } from './constants'

const validVersionOrRange = (input = throw new Error("'input' is required."), {
  dissallowRanges = false,
  dissallowVersions = false,
  onlyXRange = false
} = {}) =>
  !!((dissallowVersions !== true && semver.valid(input))
    || (onlyXRange !== true && dissallowRanges !== true && semver.validRange(input))
    || (onlyXRange === true && input.match(xRangeRE)))

export { validVersionOrRange }
