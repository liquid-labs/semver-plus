import semver from 'semver'

import { xRangeRE } from './constants'

const validVersionOrRange = ({
  dissallowRanges = false,
  dissallowVersions = false,
  input = throw new Error("'input' is required."),
  onlyXRange = false
}) =>
  !!((dissallowVersions !== true && semver.valid(input))
    || (onlyXRange !== true && dissallowRanges !== true && semver.validRange(input))
    || (onlyXRange === true && input.match(xRangeRE)))

export { validVersionOrRange }
