# @liquid-labs/semver-plus

Adds additional functionality to and fixes limitations in the base semver package.

## Installation

```
npm i @liquid-labs/semver-plus
```

## Usage

```
# import * as semver from 'semver' -> can be replaced
import * as semver from '@liquid-labs/semver-plus'

// use recognized 'alpha' -> 'beta' -> 'rc' -> gold/production progression with 'pretype'
const nextVer = semver.nextVersion('v1.0.0-alpha.8', 'pretype')
console.log(`next version: ${nextVer}`) // 'v1.0.0-beta.0'
```

@liquid-labs/semver-plus should be a drop in replacement for almost all use cases. It exports all the base semver functions. A few are wrapped to provide additional funcitonality and/or address weaknesses in the base semver package. These can be called with a `compat : true` to execute the base function without modification.
