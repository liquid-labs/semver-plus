/* global describe expect test */
import { maxSatisfying } from '../max-satisfying'

describe('maxSatisfying', () => {
  test.each([
    [['1.0.0-alpha.0', '1.0.0-beta.0'], '<1.0.0-beta.0', undefined, '1.0.0-alpha.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0'], '>1.0.0-beta.0', undefined, '1.0.0-rc.0'],
    [['1.0.0-alpha.0', '1.0.0'], '*', undefined, '1.0.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '<1.0.0', undefined, null],
    [['1.0.0-alpha.2', '1.0.0-alpha.13'], '>1.0.0-alpha.0', undefined, '1.0.0-alpha.13'],
    [['2.0.0-alpha.0', '1.0.0'], '*', undefined, '1.0.0'],
    [[], '*', undefined, null],
    // includePrerelease = true
    [['1.0.0-alpha.0', '1.0.0-beta.0'], '<1.0.0-beta.0', { includePrerelease : true }, '1.0.0-alpha.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0'], '>1.0.0-beta.0', { includePrerelease : true }, '1.0.0-rc.0'],
    [['1.0.0-alpha.0', '1.0.0'], '*', { includePrerelease : true }, '1.0.0'],
    [['1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '<1.0.0', { includePrerelease : true }, '1.0.0-rc.0'],
    [['1.0.0-alpha.2', '1.0.0-alpha.13'], '>1.0.0-alpha.0', { includePrerelease : true }, '1.0.0-alpha.13'],
    [['2.0.0-alpha.0', '1.0.0'], '*', { includePrerelease : true }, '2.0.0-alpha.0'],
    [[], '*', { includePrerelease : true }, null],
    // compat = true
    [['1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0'], '<1.0.0', { compat : true, includePrerelease : true }, '1.0.0-rc.0']
  ])('versions %p, range %s, options %v -> %s',
    (versions, range, options, expected) =>
      expect(maxSatisfying(versions, range, options)?.toString() || null).toBe(expected))

  test('invalid version raises exception',
    () => expect(() => maxSatisfying(['1.0.0', 'not-a-valid-vesion'], '*', { throwIfInvalid : true })).toThrow())

  /* test.each([
    [['1.0.0', 'not-a-valid-vesion', 'abc'], '1.0.0']
  ])("'ignoreNonVersions' filters non-version strings from the version list",
    (versions, expected) => expect(maxSatisfying(versions, '*', { ignoreNonVersions : true })).toBe(expected)) */
})
