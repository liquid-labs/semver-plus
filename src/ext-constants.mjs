export const increments = [
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
export const prereleaseIncrements = ['prerelease', 'pretype', 'alpha', 'beta', 'rc', 'gold']
export const releaseTypes = ['alpha', 'beta', 'rc', 'gold']

Object.freeze(increments)
Object.freeze(prereleaseIncrements)
Object.freeze(releaseTypes)
