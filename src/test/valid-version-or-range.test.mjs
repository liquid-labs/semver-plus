/* global describe expect test */
import { validVersionOrRange } from '../valid-version-or-range'

describe('validVersionOrRange', () => {
  test.each([
    ['1.0.0', undefined, true],
    ['1.0.0-alpha.0', undefined, true],
    ['1.0.0-alpha.1', undefined, true],
    ['1.0.0 - 2', undefined, true],
    ['1.0.x', { onlyXRange : true }, true],
    ['1.0.0-alpha.1', undefined, true]
  ])('%s => %s', (input, options, expected) => expect(validVersionOrRange(input, options)).toBe(expected))
})
