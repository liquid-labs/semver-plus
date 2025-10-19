/* global describe expect test */
import { validVersionOrRange } from '../valid-version-or-range'

describe('validVersionOrRange', () => {
  test.each([
    ['1.0.0', undefined, '1.0.0'],
    ['1.0.0-alpha.0', undefined, '1.0.0-alpha.0'],
    ['1.0.0-alpha.1', undefined, '1.0.0-alpha.1'],
    ['1.0.0 - 2', undefined, '>=1.0.0 <3.0.0-0'],
    ['1.0.x', { onlyXRange : true }, '>=1.0.0 <1.1.0-0'],
    ['not-a-valid-version', undefined, null],
    ['not-a-valid-range', undefined, null],
    // invalid versions and ranges
    ['1.0.0', { disallowVersions : true }, null],
    ['1.0.x', { disallowRanges : true }, null]
  ])('%s => %s', (input, options, expected) => expect(validVersionOrRange(input, options)).toBe(expected))

  test.each([
    ['not-a-valid-version', { throwIfInvalid : true }],
    ['not-a-valid-range', { throwIfInvalid : true }],
    // invalid versions and ranges
    ['1.0.0', { disallowVersions : true, throwIfInvalid : true }],
    ['1.0.x', { disallowRanges : true, throwIfInvalid : true }],
    ['1.0.0', { disallowVersions : true, disallowRanges : true }]
  ])('invalid %s (%o) raises exception', (input, options) =>
    expect(() => validVersionOrRange(input, options)).toThrow())
})
