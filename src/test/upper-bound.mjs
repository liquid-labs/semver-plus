import { upperBound } from '../ceiling-range'

describe('upperBound', () => {
  test.each([
    ['*', '*'],
    ['1.0.0', '1.0.0'],
    ['2', '<3.0.0-0'],
    ['1.0.0 - 2', '<3.0.0-0'],
    ['1.0.x', '<1.1.0-0'],
    ['1.0.0-alpha.1', '1.0.0-alpha.1'],
    ['1.0 - 1.2.3', '1.2.3'],
  ])('%s => %s', (input, expected) => expect(upperBound(input)).toBe(expected))
})