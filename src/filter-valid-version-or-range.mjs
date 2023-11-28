import semver from 'semver'

import { xRangeRE } from './constants'
import { validVersionOrRange } from './valid-version-or-range'

const filterValidVersionOrRange = ({
  input = throw new Error("'input' is required."),
  ...options
}) => input.filter((i) => validVersionOrRange({ input: i, ...options}))

export { filterValidVersionOrRange }
