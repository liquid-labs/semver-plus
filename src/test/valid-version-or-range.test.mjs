import { validVersionOrRange } from '../valid-version-or-range'

describe('validVersionOrRange', () => {
  test.each([
    [{ input : '1.0.0' }, true],
    [{ input : '1.0.0-alpha.0' }, true],
    [{ input : '1.0.0-alpha.1' }, true],
    [{ input : '1.0.0 - 2' }, true],
    [{ input : '1.0.x', onlyXRange: true }, true],
    [{ input : '1.0.0-alpha.1' }, true],
  ])('%s => %s', (input, expected) => expect(validVersionOrRange(input)).toBe(expected))
})