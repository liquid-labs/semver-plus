/* global describe expect test */
import { filterValidVersionOrRange } from '../filter-valid-version-or-range'

describe('filterValidVersionOrRange', () => {
  test.each([
    [
      ['1.0', '1.2.3', '2.3.9-alpha.12', '1.1.1-alpha.x', 'backlog', '1.2.x', '8.*', '*', '1.2.4.*', '^1.2.3'],
      ['1.2.3', '2.3.9-alpha.12', '1.1.1-alpha.x', '1.2.x', '8.*', '*']
    ]
  ])('%p => %p', (input, expected) => expect(filterValidVersionOrRange({ input, onlyXRange : true })).toEqual(expected))
})
