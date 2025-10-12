/* global beforeAll describe expect test */

import * as ver from '../next-version'

describe('nextVersion', () => {
  describe('handles semver style', () => {
    test.each([
      ['1.0.0', undefined, '1.0.1'],
      ['1.0.0-alpha.94', undefined, '1.0.0-alpha.95'],
      ['1.0.0-alpha.94', 'prerelease', '1.0.0-alpha.95'],
      ['1.0.0-beta.94', undefined, '1.0.0-beta.95'],
      ['1.0.0-beta.94', 'prerelease', '1.0.0-beta.95'],
      ['1.0.0-rc.94', undefined, '1.0.0-rc.95'],
      ['1.0.0-rc.94', 'prerelease', '1.0.0-rc.95'],
      ['1.0.0', 'patch', '1.0.1'],
      ['1.0.0', 'minor', '1.1.0'],
      ['1.0.0', 'major', '2.0.0'],
      ['1.0.0', 'prepatch', '1.0.1-alpha.0'],
      ['1.0.0', 'preminor', '1.1.0-alpha.0'],
      ['1.0.0', 'premajor', '2.0.0-alpha.0'],
      ['1.0.0-alpha.1', 'pretype', '1.0.0-beta.0'],
      ['1.0.0-beta.1', 'pretype', '1.0.0-rc.0'],
      ['1.2.3-rc.0', 'pretype', '1.2.3'],
      ['1.0.0-rc.1', 'pretype', '1.0.0'],
      ['1.0.0-alpha.1', 'beta', '1.0.0-beta.0'],
      ['1.0.0-alpha.1', 'rc', '1.0.0-rc.0'],
      ['1.0.0-alpha.1', 'gold', '1.0.0'],
      ['1.0.0-beta.1', 'rc', '1.0.0-rc.0'],
      ['1.0.0-beta.1', 'gold', '1.0.0'],
      ['1.0.0-rc.1', 'gold', '1.0.0']
    ])("%s + '%s' -> %s", (currVer, increment, expected) => expect(ver.nextVersion({ currVer, increment })).toBe(expected))

    test.each([
      ['1.0.0', 'prerelease'],
      ['1.0.0-foo.1', 'pretype'],
      ['1.0.0', 'primary'],
      ['1.0.0-alpha.1', 'major'],
      ['1.0.0-alpha.1', 'premajor'],
      ['1.0.0-alpha.1', 'minor'],
      ['1.0.0-alpha.1', 'preminor'],
      ['1.0.0-alpha.1', 'patch'],
      ['1.0.0-alpha.1', 'prepatch'],
      ['1.0.0-beta.1', 'alpha'],
      ['1.0.0-beta.1', 'beta'],
      ['1.0.0-rc.1', 'alpha'],
      ['1.0.0-rc.1', 'beta'],
      ['1.0.0-rc.1', 'rc'],
      ['1.0.0', 'alpha'],
      ['1.0.0', 'beta'],
      ['1.0.0', 'rc']
    ])('%s + %s -> throws an exception', (currVer, increment) =>
      expect(() => ver.nextVersion({ currVer, increment })).toThrow())
  })

  test.each([
    'prototype.1',
    '0.738.1',
    'x-y-z--'
  ])("raises an exception on invalid prerelease name '%s'", (currPrerelease) => {
    const currVer = `1.0.0-${currPrerelease}`
    expect(() => ver.version({ currVer, increment : 'prerelease' }))
  })
})
