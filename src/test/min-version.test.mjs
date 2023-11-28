/* global describe expect test */
import { minVersion } from '../min-version'

describe('minVersion', () => {
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
  ])('%s => %s', (input, expected) => expect(minVersion(input)).toBe(expected))
})