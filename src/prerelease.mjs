import semver from 'semver'

const prerelease = (version) => {
  return semver.prerelease(version)
}

export { prerelease }
