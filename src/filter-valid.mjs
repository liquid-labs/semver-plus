import semver from 'semver'

import { xRangeRE } from './constants'

const filterValid = ({ 
  dissallowRanges = false, 
  dissallowVersions = false, 
  input = throw new Error("'input' is required."),
  onlyXRange = false
}) => 
  input.filter((i) => (dissallowVersions !== true && semver.valid(i))
    || (onlyXRange !== true && dissallowRanges !== true && semver.validRange(i))
    || (onlyXRange === true && i.match(xRangeRE)))

export { filterValid }