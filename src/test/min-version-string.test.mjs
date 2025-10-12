import semver from 'semver'

import { minVersionString } from '../min-version-string'

describe('minVersionString', () => {
  test('verify semver prerelease bug', () => {
    // we want to make sure we have the actual semver and not our local, which may have wrapper logic to fix this
    expect(semver.minVersion('1.0.0-alpha.x').toString()).toBe('1.0.0-alpha.x') // correct
    expect(semver.minVersion('1.0.0-alpha.x', { includePrerelease : true }).toString()).toBe('1.0.0-alpha.x') // incorrect
})
  
  test.each([
    ['*', '0.0.0'],
    ['1.*', '1.0.0'],
    ['1.0.*', '1.0.0'],
    ['1.0.0-alpha.*', '1.0.0-alpha.0'],
    ['1.0.0-beta.*', '1.0.0-beta.0'],
    ['1.0.0-rc.*', '1.0.0-rc.0'],
    ['x', '0.0.0'],
    ['1.x', '1.0.0'],
    ['1.0.x', '1.0.0'],
    ['1.0.0-alpha.x', '1.0.0-alpha.0'],
    ['1.0.0-beta.x', '1.0.0-beta.0'],
    ['1.0.0-rc.x', '1.0.0-rc.0'],
    ['1.0.0 - 2', '1.0.0']
  ])('%s => %s', (input, expected) => expect(minVersionString(input)).toBe(expected))
})
