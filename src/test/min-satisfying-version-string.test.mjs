/* global describe expect test */
import { minSatisfyingVersionString } from '../min-satisfying-version-string'

describe('minSatisfyingVersionString', () => {
  test.each([
    [['1.0.0-alpha.0', '1.0.0-beta.0'], '1.0.0-alpha.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0'], '1.0.0-beta.0'],
    [['1.0.0-alpha.0', '1.0.0'], '1.0.0-alpha.0'],
    [['1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '1.0.0-alpha.0'],
    [['2.0.0-alpha.0', '1.0.0'], '1.0.0'],
    [['1.0.0-alpha.2', '1.0.0-alpha.13'], '1.0.0-alpha.2']
  ])('versions %p -> %s', (versions, expected) => expect(minSatisfyingVersionString(versions)).toBe(expected))

  test('[] => null', () => expect(minSatisfyingVersionString([])).toBe(null))

  test('mixed version types raises exception',
    () => expect(() => minSatisfyingVersionString(['1.0.0', 'not-a-valid-vesion'])).toThrow())

  test.each([
    [['1.0.0', 'not-a-valid-vesion', 'abc'], '1.0.0']
  ])("'ignoreNonVersions' filters non-version strings from the version list",
    (versions, expected) => expect(minSatisfyingVersionString(versions, { ignoreNonVersions : true })).toBe(expected))
})
