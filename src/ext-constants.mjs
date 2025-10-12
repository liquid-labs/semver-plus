export const STANDARD_INCREMENTS = [
  'major',
  'minor',
  'patch',
  'premajor',
  'preminor',
  'prepatch',
  'prerelease',
  'pretype',
  'alpha',
  'beta',
  'rc',
  'gold'
]

export const STANDARD_PRERELEASE_INCREMENTS = ['prerelease', 'pretype', 'alpha', 'beta', 'rc', 'gold']
export const STANDARD_PRERELEASE_NAMES = ['alpha', 'beta', 'rc']
export const STANDARD_RELEASE_NAMES = [...STANDARD_PRERELEASE_NAMES, 'gold']

Object.freeze(STANDARD_PRERELEASE_INCREMENTS)
Object.freeze(STANDARD_PRERELEASE_NAMES)
Object.freeze(STANDARD_RELEASE_NAMES)
Object.freeze(STANDARD_INCREMENTS)
