/* global describe expect test */

import semver from 'semver'

import { maxVersion, minVersion } from '../version-compare'

describe('maxVersion', () => {
  test.each([
    [[ '1.0.0-alpha.0', '1.0.0-beta.0' ], '1.0.0-beta.0' ],
    [[ '1.0.0-beta.0', '1.0.0-rc.0' ], '1.0.0-rc.0' ],
    [[ '1.0.0-alpha.0', '1.0.0' ], '1.0.0' ],
    [[ '1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0' ], '1.0.0' ],
    [[ '1.0.0-alpha.2', '1.0.0-alpha.13' ], '1.0.0-alpha.13' ],
    [[ '2.0.0-alpha.0', '1.0.0' ], '2.0.0-alpha.0' ],
    [[ '20230303.051512Z', '20230304.051512Z-alpha.0' ], '20230304.051512Z-alpha.0' ],
    [[ '20230304.051512Z-beta.0', '20230304.051512Z-alpha.0' ], '20230304.051512Z-beta.0' ],
    [[ '20230304.051512Z-beta.0', '20230304.051512Z-rc.0' ], '20230304.051512Z-rc.0' ]
  ])('versions %p -> %s', (versions, expected) => expect(maxVersion({ versions })).toBe(expected))

  test('[] => null', () => expect(maxVersion({ versions: [] })).toBe(null))
})

describe('minVersion', () => {
  test.each([
    [[ '1.0.0-alpha.0', '1.0.0-beta.0' ], '1.0.0-alpha.0' ],
    [[ '1.0.0-beta.0', '1.0.0-rc.0' ], '1.0.0-beta.0' ],
    [[ '1.0.0-alpha.0', '1.0.0' ], '1.0.0-alpha.0' ],
    [[ '1.0.0-alpha.0', '1.0.0-beta.0', '1.0.0-rc.0', '1.0.0' ], '1.0.0-alpha.0' ],
    [[ '2.0.0-alpha.0', '1.0.0' ], '1.0.0' ],
    [[ '1.0.0-alpha.2', '1.0.0-alpha.13' ], '1.0.0-alpha.2' ],
    [[ '20230303.051512Z', '20230304.051512Z-alpha.0' ], '20230303.051512Z' ],
    [[ '20230304.051512Z-beta.0', '20230304.051512Z-alpha.0' ], '20230304.051512Z-alpha.0' ],
    [[ '20230304.051512Z-beta.0', '20230304.051512Z-rc.0' ], '20230304.051512Z-beta.0' ]
  ])('versions %p -> %s', (versions, expected) => expect(minVersion({ versions })).toBe(expected))

  test('[] => null', () => expect(minVersion({ versions: [] })).toBe(null))
})