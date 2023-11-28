export const STYLE_SEMVER = 'semver'
export const STYLE_TIMEVER = 'timever'
export const STYLE_AUTO = 'auto'
export const TIMEVER_REGEX = /(\d{8})[.-](\d{6})Z(?:-(alpha|beta|rc)\.(\d)+)?$/
export const TIMEVER_DATE_POS = 1
export const TIMEVER_TIME_POS = 2
export const TIMEVER_PRETYPE_POS = 3
export const TIMEVER_PREVER_POS = 4

export const xRangeRE =
  //  v single tuple  v doublpe tuple             v triple tuple            v quad/pre-release tuple
  //          v if there's more than a single digit, it can't lead with a zero
  /^(?:[x*]|[1-9]?[0-9]+\.[x*]|(?:[1-9]?[0-9]+\.){2}[x*]|(?:[1-9]?[0-9]+\.){2}[1-9]?[0-9]+-(?:alpha|beta|rc)\.[x*])$/
export const prereleaseXRangeRE = /^(?:[1-9]?[0-9]+\.){2}[1-9]?[0-9]+-(?:alpha|beta|rc)\.[x*]$/