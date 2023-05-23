/* global describe expect test */

import { prerelease } from '../prerelease'

describe('prerelease', () => {
  test.each([
    ['1.0.0', null],
    ['1.0.0-beta.0', ['beta', 0]],
    ['1.0.0-alpha.2', ['alpha', 2]],
    ['20230303.051512Z', null],
    ['20230304.051512Z-beta.0', ['beta', 0]],
    ['20230304.051512Z-alpha.2', ['alpha', 2]]
  ])('version %p yields %s', (version, expected) => expect(prerelease(version)).toEqual(expected))
})
