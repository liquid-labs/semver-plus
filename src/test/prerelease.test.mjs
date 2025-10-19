/* global describe expect test */

import { prerelease } from '../semver-version-ops'

describe('prerelease', () => {
  test.each([
    ['1.0.0', null],
    ['1.0.0-beta.0', ['beta', 0]],
    ['1.0.0-alpha.2', ['alpha', 2]]
  ])('version %p yields %s', (version, expected) => expect(prerelease(version)).toEqual(expected))
})
