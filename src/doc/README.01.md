# @liquid-labs/semver-plus

Adds additional functionality to and fixes limitations in the base semver package.

## Installation

```
npm i @liquid-labs/semver-plus
```

## Usage

```
import * as semverplus from '@liquid-labs/semver-plus'

// use recognized 'alpha' -> 'beta' -> 'rc' -> gold/production progression with 'pretype'
const nextVer = semverplus.nextVersion('v1.0.0-alpha.8', 'pretype')
console.log(`next version: ${nextVer}`) // 'v1.0.0-beta.0'
```
