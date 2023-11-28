/* global describe expect test */
import { firstPast } from '../first-past'

describe('firstPast', () => {
  test.each([
    ['*', null],
    ['1.*', '2.0.0'],
    ['1.2.*', '1.3.0'],
    ['1.2.3-alpha.*', '1.2.3-beta.0'],
    ['1.2.3-beta.*', '1.2.3-rc.0'],
    ['1.2.3-rc.*', '1.2.3'],
  ])('%s => %s', (input, expected) => expect(firstPast(input)).toBe(expected))
})