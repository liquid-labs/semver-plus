/* global beforeAll describe expect test */

import * as ver from '../next-version'

describe('makeTS', () => {
  test('Jan 3, 2023 0513.25 => 20230303.051325Z', () => {
    const date = new Date('2023-03-03T05:13:25.000Z')

    expect(ver.makeTS({ date })).toBe('20230303.051325Z')
  })
})

describe('nextVersion', () => {
  describe('handles semver style', () => {
    test.each([
      ['1.0.0', undefined, '1.0.1'],
      ['1.0.0-alpha.94', undefined, '1.0.0-alpha.95'],
      ['1.0.0-alpha.94', 'prerelease', '1.0.0-alpha.95'],
      ['1.0.0-beta.94', undefined, '1.0.0-beta.95'],
      ['1.0.0-beta.94', 'prerelease', '1.0.0-beta.95'],
      ['1.0.0-rc.94', undefined, '1.0.0-rc.95'],
      ['1.0.0-rc.94', 'prerelease', '1.0.0-rc.95'],
      ['1.0.0', 'patch', '1.0.1'],
      ['1.0.0', 'minor', '1.1.0'],
      ['1.0.0', 'major', '2.0.0'],
      ['1.0.0', 'prepatch', '1.0.1-alpha.0'],
      ['1.0.0', 'preminor', '1.1.0-alpha.0'],
      ['1.0.0', 'premajor', '2.0.0-alpha.0'],
      ['1.0.0-alpha.1', 'pretype', '1.0.0-beta.0'],
      ['1.0.0-beta.1', 'pretype', '1.0.0-rc.0'],
      ['1.0.0-rc.1', 'pretype', '1.0.0'],
      ['1.0.0-alpha.1', 'beta', '1.0.0-beta.0'],
      ['1.0.0-alpha.1', 'rc', '1.0.0-rc.0'],
      ['1.0.0-alpha.1', 'gold', '1.0.0'],
      ['1.0.0-beta.1', 'rc', '1.0.0-rc.0'],
      ['1.0.0-beta.1', 'gold', '1.0.0'],
      ['1.0.0-rc.1', 'gold', '1.0.0']
    ])("%s + '%s' -> %s", (currVer, increment, expected) => expect(ver.nextVersion({ currVer, increment })).toBe(expected))

    test.each([
      ['1.0.0', 'prerelease'],
      ['1.0.0-foo.1', 'pretype'],
      ['1.0.0', 'primary'],
      ['1.0.0-alpha.1', 'major'],
      ['1.0.0-alpha.1', 'premajor'],
      ['1.0.0-alpha.1', 'minor'],
      ['1.0.0-alpha.1', 'preminor'],
      ['1.0.0-alpha.1', 'patch'],
      ['1.0.0-alpha.1', 'prepatch'],
      ['1.0.0-beta.1', 'alpha'],
      ['1.0.0-beta.1', 'beta'],
      ['1.0.0-rc.1', 'alpha'],
      ['1.0.0-rc.1', 'beta'],
      ['1.0.0-rc.1', 'rc'],
      ['1.0.0','alpha'],
      ['1.0.0','beta'],
      ['1.0.0','rc']
    ])('%s + %s -> throws an exception', (currVer, increment) =>
      expect(() => ver.nextVersion({ currVer, increment })).toThrow())
  })

  test.each([
    'prototype.1', 
    '0.738.1', 
    'x-y-z--'
  ])("raises an exception on invalid prerelease name '%s'", (currPrerelease) => {
    const currVer = `1.0.0-${currPrerelease}`
    expect(() => ver.version({ currVer, increment: 'prerelease' }))
  })

  describe('handles timever style', () => {
    let preTS, resultReleased, resultPreInit, resultPreOngoing, resultPretype, postTS
    const startTimeVer = '1.20230103.051325Z'
    const testReleased = [
      [startTimeVer, undefined, '1'],
      [startTimeVer, 'patch', '1'],
      [startTimeVer, 'minor', '1'],
      [startTimeVer, 'major', '2']
    ]
    const testPreInit = [
      [startTimeVer, 'prepatch', '1', '-alpha.0'],
      [startTimeVer, 'preminor', '1', '-alpha.0'],
      [startTimeVer, 'premajor', '2', '-alpha.0']
    ]
    const testPreOngoing = [
      [startTimeVer + '-alpha.1', 'prerelease', '-alpha.2'],
      [startTimeVer + '-beta.1', 'prerelease', '-beta.2'],
      [startTimeVer + '-rc.1', 'prerelease', '-rc.2']
    ]
    const testPretype = [
      [startTimeVer + '-alpha.1', 'pretype', startTimeVer + '-beta.0'],
      [startTimeVer + '-beta.1', 'pretype', startTimeVer + '-rc.0']
    ]
    beforeAll(async() => {
      const start = new Date()
      preTS = ver.makeTS(start)
      await new Promise(resolve => setTimeout(resolve, 1000))
      resultReleased = testReleased
        .map(([currVer, increment, nextMajor]) => [ver.nextVersion({ currVer, increment }), nextMajor])
      resultPreInit = testPreInit
        .map(([currVer, increment, result]) => [ver.nextVersion({ currVer, increment })])
      resultPreOngoing = testPreOngoing
        .map(([currVer, increment, nextPre]) => [ver.nextVersion({ currVer, increment })])
      resultPretype = testPretype
        .map(([currVer, increment]) => [ver.nextVersion({ currVer, increment })])
      await new Promise(resolve => setTimeout(resolve, 1000))
      const end = new Date()
      postTS = ver.makeTS(end)
    })

    // TODO: it would be nice to do these as some kind of loop, but since we do all our calculations at once (in the
    // beforeAll) in order to minimize the sleep times, '.each' won't work because the values are calculated before the
    // before.
    describe('released increment', () => {
      test(`${testReleased[0][0]} + ${testReleased[0][1]} -> ${testReleased[0][2]}.<newTS>`, () => {
        expect(resultReleased[0][0]).toMatch(/1\.\d{8}.\d{6}Z/)
        const raw = ['1.' + preTS, resultReleased[0][0], `${testReleased[0][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })

      test(`${testReleased[1][0]} + ${testReleased[1][1]} -> ${testReleased[1][2]}.<newTS>`, () => {
        expect(resultReleased[1][0]).toMatch(/1\.\d{8}.\d{6}Z/)
        const raw = ['1.' + preTS, resultReleased[1][0], `${testReleased[1][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })

      test(`${testReleased[2][0]} + ${testReleased[2][1]} -> ${testReleased[2][2]}.<newTS>`, () => {
        expect(resultReleased[2][0]).toMatch(/1\.\d{8}.\d{6}Z/)
        const raw = ['1.' + preTS, resultReleased[2][0], `${testReleased[2][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })

      test(`${testReleased[3][0]} + ${testReleased[3][1]} -> ${testReleased[3][2]}.<newTS>`, () => {
        expect(resultReleased[3][0]).toMatch(/2\.\d{8}.\d{6}Z/)
        const raw = ['1.' + preTS, resultReleased[3][0], `${testReleased[3][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })
    })

    describe('initial pre-increment', () => {
      test(`${testPreInit[0][0]} + ${testPreInit[0][1]} -> 1.<newTS>${testPreInit[0][3]}`, () => {
        expect(resultPreInit[0][0]).toMatch(/1\.\d{8}.\d{6}Z-alpha\.0/)
        const raw = ['1.' + preTS, resultPreInit[0][0], `${testPreInit[0][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })

      test(`${testPreInit[1][0]} + ${testPreInit[1][1]} -> ${testPreInit[1][2]}.<newTS>${testPreInit[1][3]}`, () => {
        expect(resultPreInit[1][0]).toMatch(/1\.\d{8}.\d{6}Z-alpha\.0/)
        const raw = ['1.' + preTS, resultPreInit[1][0], `${testPreInit[1][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })

      test(`${testPreInit[2][0]} + ${testPreInit[2][1]} -> ${testPreInit[2][2]}.<newTS>${testPreInit[2][3]}`, () => {
        expect(resultPreInit[2][0]).toMatch(/2\.\d{8}.\d{6}Z-alpha\.0/)
        const raw = ['1.' + preTS, resultPreInit[2][0], `${testPreInit[2][2]}.${postTS}`]
        const sorted = [...raw].sort()
        expect(raw).toEqual(sorted)
      })
    })

    describe('ongoing pre-increment', () => {
      test(`${testPreOngoing[0][0]} + ${testPreOngoing[0][1]} -> ${testPreOngoing[0][0].slice(0, -1) + '2'}`, () => {
        expect(resultPreOngoing[0][0]).toBe(testPreOngoing[0][0].slice(0, -1) + '2')
      })

      test(`${testPreOngoing[1][0]} + ${testPreOngoing[1][1]} -> ${testPreOngoing[1][0].slice(0, -1) + '2'}`, () => {
        expect(resultPreOngoing[1][0]).toBe(testPreOngoing[1][0].slice(0, -1) + '2')
      })

      test(`${testPreOngoing[2][0]} + ${testPreOngoing[2][1]} -> ${testPreOngoing[2][0].slice(0, -1) + '2'}`, () => {
        expect(resultPreOngoing[2][0]).toBe(testPreOngoing[2][0].slice(0, -1) + '2')
      })
    })

    describe('pretype', () => {
      test(`${testPretype[0][0]} + ${testPretype[0][1]} -> ${testPretype[0][2]}`, () =>
        expect(resultPretype[0][0]).toBe(testPretype[0][2]))

      test(`${testPretype[1][0]} + ${testPretype[1][1]} -> ${testPretype[1][2]}`, () =>
        expect(resultPretype[1][0]).toBe(testPretype[1][2]))

      test(`${startTimeVer}-rc.1 + pretype -> 1.<newTS>`, () => {
        const currVer = startTimeVer + '-rc.1'
        const newVer = ver.nextVersion({ currVer, increment : 'pretype' })
        expect(newVer).toMatch(/^\d+.\d{8}.\d{6}Z$/)
        expect(newVer).not.toBe(startTimeVer)
        const sorted = [startTimeVer, newVer].sort()
        expect(sorted[0]).toBe(startTimeVer)
      })
    })
  })
})
