import { prereleaseXRangeRE } from './constants'
import { setDefaultOptions } from './lib/set-default-options'
import { minVersion, validRange } from './semver-range-ops'

const minVersionString = (range, options) => {
    options = setDefaultOptions(options)
    // given range '1.0.0-alpha.x', semver treats that as a specific version and says the min version is
    // '1.0.0-alpha.x' even when 'options.includePrerelease' is true; this is verified in the unit tests.
    console.log(`********\nrange: ${range}\noptions: ${JSON.stringify(options)}\n********`) // DEBUG
    if (options.includePrerelease === true && range.match(prereleaseXRangeRE)) {
        return range.slice(0, -1) + '0'
    }
    else {
        const semverRange = validRange(range)
        if (semverRange !== null) {
            return minVersion(semverRange, options).version
        }
    }
    // else
    throw new Error(`Invaid range '${range}'.`)
}

export { minVersionString }