

const setDefaultOptions = (options = {}) => {
    if (!('includePrerelease' in options)
        && (process.env.SEMVER_PLUS_COMPAT === undefined
            || process.env.SEMVER_PLUS_COMPAT.toLocaleLowerCase() === 'false'
            || process.env.SEMVER_PLUS_COMPAT === '0')) {
        options.includePrerelease = true
    }

    return options
}

export { setDefaultOptions }