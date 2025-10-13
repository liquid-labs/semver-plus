import semver from 'semver'

const filterValidVersions = (versions, { ignoreNonVersions }) => {
  versions = versions.filter((version) => {
    const valid = semver.valid(version) !== null

    if (valid === false) {
      if (ignoreNonVersions === true) {
        return false
      }
      else {
        throw new Error(`'${version}' is not a valid semver.`)
      }
    }

    return true
  })

  return versions
}

export { filterValidVersions }
