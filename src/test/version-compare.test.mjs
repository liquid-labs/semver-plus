/* global describe expect test */

import { maxVersion, minVersion } from '../version-compare'

describe('maxVersion', () => {
  test.each([
    [['1.0.0-alpha.0', '1.0.0-beta.0'], '1.0.0-beta.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0'], '1.0.0-rc.0'],
    [['1.0.0-alpha.0', '1.0.0'], '1.0.0'],
    [['1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '1.0.0'],
    [['1.0.0-alpha.2', '1.0.0-alpha.13'], '1.0.0-alpha.13'],
    [['2.0.0-alpha.0', '1.0.0'], '2.0.0-alpha.0']
  ])('versions %p -> %s', (versions, expected) => expect(maxVersion({ versions })).toBe(expected))

  test('[] => null', () => expect(maxVersion({ versions : [] })).toBe(null))

  test('mixed version types raises exception',
    () => expect(() => maxVersion({ versions : ['1.0.0', 'not-a-valid-vesion'] })).toThrow())

  test.each([
    [['1.0.0', 'not-a-valid-vesion', 'abc'], '1.0.0']
  ])("'ignoreNonVersions' filters non-version strings from the version list",
    (versions, expected) => expect(maxVersion({ ignoreNonVersions : true, versions })).toBe(expected))
})

describe('minVersion', () => {
  test.each([
    [['1.0.0-alpha.0', '1.0.0-beta.0'], '1.0.0-alpha.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0'], '1.0.0-beta.0'],
    [['1.0.0-alpha.0', '1.0.0'], '1.0.0-alpha.0'],
    [['1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '1.0.0-alpha.0'],
    [['2.0.0-alpha.0', '1.0.0'], '1.0.0'],
    [['1.0.0-alpha.2', '1.0.0-alpha.13'], '1.0.0-alpha.2']
  ])('versions %p -> %s', (versions, expected) => expect(minVersion({ versions })).toBe(expected))

  test('[] => null', () => expect(minVersion({ versions : [] })).toBe(null))

  test('mixed version types raises exception',
    () => expect(() => minVersion({ versions : ['1.0.0', 'not-a-valid-vesion'] })).toThrow())

  test.each([
    [['1.0.0', 'not-a-valid-vesion', 'abc'], '1.0.0']
  ])("'ignoreNonVersions' filters non-version strings from the version list",
    (versions, expected) => expect(minVersion({ ignoreNonVersions : true, versions })).toBe(expected))
})
