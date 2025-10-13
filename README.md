# semver-plus
##  API reference
_API generated with [dmd-readme-api](https://www.npmjs.com/package/dmd-readme-api)._

<span id="global-function-index"></span>
- Functions:
  - <span id="global-function-Comparison-operations-index"></span>_Comparison operations_
    - [`cmp()`](#cmp): Returns a number indicating whether a version is greater than, equal to, or less than another version.
    - [`compare()`](#compare): Returns 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.
    - [`compareBuild()`](#compareBuild): Same as [compare](#compare) except it compares build if two versions are otherwise equal.
    - [`compareLoose()`](#compareLoose): Short for [compare](#compare) with `options.loose = true`.
    - [`diff()`](#diff): Returns the difference between two versions.
    - [`eq()`](#eq): Returns `true` if `v1` is equal to `v2`, `false` otherwise.
    - [`gt()`](#gt): Returns `true` if `v1` is greater than `v2`, `false` otherwise.
    - [`gte()`](#gte): Returns `true` if `v1` is greater than or equal to `v2`, `false` otherwise.
    - [`lt()`](#lt): Returns `true` if `v1` is less than `v2`, `false` otherwise.
    - [`lte()`](#lte): Returns `true` if `v1` is less than or equal to `v2`, `false` otherwise.
    - [`neq()`](#neq): Returns `true` if `v1` is not equal to `v2`, `false` otherwise.
    - [`rcompare()`](#rcompare): Reverse of [compare](#compare).
    - [`rsort()`](#rsort): Sorts an array of versions in descending order using [compareBuild](#compareBuild).
    - [`sort()`](#sort): Sorts an array of versions in ascending order using [compareBuild](#compareBuild).
  - <span id="global-function-Range-operations-index"></span>_Range operations_
    - [`gtr()`](#gtr): Returns `true` if `version` is greater than is greater than any version in `range`, `false` otherwise.
    - [`intersects()`](#intersects): Returns `true` if any of the comparators in the range intersect with each other.
    - [`ltr()`](#ltr): Returns `true` if `version` is less than is less than any version in `range`, `false` otherwise.
    - [`maxSatisfying()`](#maxSatisfying): Returns the highest version in `versions` that satisfies the range, or null if no version satisfies the range.
    - [`minSatisfying()`](#minSatisfying): Returns the lowest version in `versions` that satisfies the range, or null if no version satisfies the range.
    - [`minVersion()`](#minVersion): Returns the lowest version that satisfies the range, or null if no version satisfies the range.
    - [`outside()`](#outside): Returns `true` if `version` is outside of `range` in the indicated direction, `false` otherwise.
    - [`satisfies()`](#satisfies): Returns `true` if the version satisfies the range, `false` otherwise.
    - [`simplifyRange()`](#simplifyRange): Return a "simplified" range that matches the same items in the versions list as the range specified.
    - [`subset()`](#subset): Returns `true` if `subRange` is a subset of `superRange`, `false` otherwise.
    - [`validRange()`](#validRange): Returns a parsed, normalized range string or null if the range is invalid.
  - [`maxSatisfyingVersionString()`](#maxSatisfyingVersionString): Like [maxVersion](maxVersion) but returns a string instead of a version object.
  - [`minSatisfyingVersionString()`](#minSatisfyingVersionString): Like [minVersion](#minVersion) but returns a string instead of a version object.
  - [`upperBound()`](#upperBound): Finds the ceiling of a range.
  - [`xSort()`](#xSort): Ascend sorts a mix of semver versions and x-range specified ranges (e.g., 1.2.* or 1.2.x).
  - <span id="global-function-Version-operations-index"></span>_Version operations_
    - [`clean()`](#clean): Returns a cleaned version string removing unecessary comparators and, if `options.loose` is true, fixing space issues.
    - [`coerce()`](#coerce): Aggressively attempts to coerce a string into a valid semver string.
    - [`inc()`](#inc): Returns a new version string incremented by the specified part.
    - [`major()`](#major): Returns the major version number.
    - [`minor()`](#minor): Returns the minor version number.
    - [`nextVersion()`](#nextVersion): Given a current version generates the next version string accourding to `increment`.
    - [`parse()`](#parse): Attempts to parse and normalize a string as a semver string.
    - [`patch()`](#patch): Returns the patch version number.
    - [`prerelease()`](#prerelease): Returns an array of prerelease components or `null` if the version is not a prerelease.
    - [`valid()`](#valid): Returns a parsed, normalized version string or null if the version is invalid.

<a id="cmp"></a>
### `cmp(v1, comparator, v2, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L87)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns a number indicating whether a version is greater than, equal to, or less than another version.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `comparator` | `string` | The comparator to use. May be '<', '<=', '>', '>=', '=', '==', '!=', '===', or '!=='. An exception is thrown if an invalid comparator is provided. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.cmp function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - A number indicating whether a version is greater than, equal to, or less than another version.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="compare"></a>
### `compare(v1, v2, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L100)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`. Will sort an array of versions in ascending order if
passed to `Array.sort()`.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.compare function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="compareBuild"></a>
### `compareBuild(v1, v2, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L112)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Same as [compare](#compare) except it compares build if two versions are otherwise equal.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.compareBuild function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="compareLoose"></a>
### `compareLoose(v1, v2)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L134)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Short for [compare](#compare) with `options.loose = true`.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |

**Returns**: `number` - - 0 if `v1 == v2`, 1 if `v1 > v2`, and -1 if `v1 < v2`.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="diff"></a>
### `diff(v1, v2, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L148)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the difference between two versions. I.e., the most significant version component by which `v1` and `v2`
differ.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.diff function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` \| `null` - - `major`, 'minor', 'patch', 'prerelease', 'premajor', 'preminor', or 'prepatch' or null if
the `v1` and `v2` are identical (disregarding build metadata).

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="eq"></a>
### `eq(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L61)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is equal to `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.eq function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is equal to `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="gt"></a>
### `gt(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L13)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is greater than `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.gt function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is greater than `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="gte"></a>
### `gte(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L25)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is greater than or equal to `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.gte function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is greater than or equal to `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="lt"></a>
### `lt(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L37)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is less than `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.lt function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is less than `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="lte"></a>
### `lte(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L49)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is less than or equal to `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.lte function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is less than or equal to `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="neq"></a>
### `neq(v1, v2, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L73)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `v1` is not equal to `v2`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.neq function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `v1` is not equal to `v2`, `false` otherwise.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="rcompare"></a>
### `rcompare(v1, v2, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L124)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Reverse of [compare](#compare).


| Param | Type | Description |
| --- | --- | --- |
| `v1` | `string` | The first version to compare. |
| `v2` | `string` | The second version to compare. |
| `options` | `object` | The options to pass to the semver.rcompare function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - 0 if `v1 == v2`, -1 if `v1 > v2`, and 1 if `v1 < v2`.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="rsort"></a>
### `rsort(versions, options)` ⇒ `Array.<string>` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L170)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Sorts an array of versions in descending order using [compareBuild](#compareBuild).


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to sort. |
| `options` | `object` | The options to pass to the semver.rsort function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `Array.<string>` - - The sorted versions.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="sort"></a>
### `sort(versions, options)` ⇒ `Array.<string>` <sup>↱<sup>[source code](./src/semver-comparison-ops.mjs#L159)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Sorts an array of versions in ascending order using [compareBuild](#compareBuild).


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to sort. |
| `options` | `object` | The options to pass to the semver.sort function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `Array.<string>` - - The sorted versions.

__Category__: [Comparison operations](#global-function-Comparison-operations-index)

<a id="gtr"></a>
### `gtr(version, range, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L62)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `version` is greater than is greater than any version in `range`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to check. |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.gtr function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `version` is greater than is greater than any version in `range`, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="intersects"></a>
### `intersects(range, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L99)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if any of the comparators in the range intersect with each other.


| Param | Type | Description |
| --- | --- | --- |
| `range` | `string` | The first version range or comparator. |
| `options` | `object` | The options to pass to the semver.intersects function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if any of the comparators in the range intersect with each other, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="ltr"></a>
### `ltr(version, range, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L74)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `version` is less than is less than any version in `range`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to check. |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.ltr function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `version` is less than is less than any version in `range`, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="maxSatisfying"></a>
### `maxSatisfying(versions, range, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L38)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the highest version in `versions` that satisfies the range, or null if no version satisfies the range.


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to check. |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.maxSatisfying function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` \| `null` - - The highest version that satisfies the range, or null if no version satisfies the range.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="minSatisfying"></a>
### `minSatisfying(versions, range, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L50)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the lowest version in `versions` that satisfies the range, or null if no version satisfies the range.


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to check. |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.minSatisfying function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` \| `null` - - The lowest version that satisfies the range, or null if no version satisfies the range.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="minVersion"></a>
### `minVersion(range, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/min-version-string.mjs#L18)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the lowest version that satisfies the range, or null if no version satisfies the range. This implementation
differs from the base `semver.minVersion` in that it correctly handles simple prerelease x-ranges. E.g.,
'1.0.0-alpha.x' -> '1.0.0-alpha.0'. To suppress this behavior, pass `options.compat = true`.


| Param | Type | Description |
| --- | --- | --- |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.minVersion function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |
| `options.includePrerelease` | `boolean` | Whether to include prerelease versions. |
| `options.compat` | `boolean` | If true, prerelease ranges are treated the same as in the base semver package; e.g. `minVersion('1.0.0-alpha.x', { compat: true })` -> '1.0.0-alpha.x'. |

**Returns**: `string` \| `null` - - The lowest version that satisfies the range, or null if no version satisfies the range.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="outside"></a>
### `outside(version, range, direction, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L88)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `version` is outside of `range` in the indicated direction, `false` otherwise. `outside(v, r, '>)`
is equivalent to `gtr(v, r)`.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to check. |
| `range` | `string` | The range to check. |
| `direction` | `string` | The direction to check. Must be '>' or '<'. |
| `options` | `object` | The options to pass to the semver.outside function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `version` is outside of `range` in the indicated direction, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="satisfies"></a>
### `satisfies(version, range, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L26)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if the version satisfies the range, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to check. |
| `range` | `string` | The range to check. |
| `options` | `object` | The options to pass to the semver.satisfies function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if the version satisfies the range, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="simplifyRange"></a>
### `simplifyRange(versions, range, options)` ⇒ `string` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L115)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Return a "simplified" range that matches the same items in the versions list as the range specified. Note that it
does not guarantee that it would match the same versions in all cases, only for the set of versions provided. This
is useful when generating ranges by joining together multiple versions with || programmatically, to provide the user
with something a bit more ergonomic. If the provided range is shorter in string-length than the generated range,
then that is returned.


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to check. |
| `range` | `string` | The range to simplify. |
| `options` | `object` | The options to pass to the semver.simplifyRange function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` - - The simplified range.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="subset"></a>
### `subset(subRange, superRange, options)` ⇒ `boolean` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L127)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns `true` if `subRange` is a subset of `superRange`, `false` otherwise.


| Param | Type | Description |
| --- | --- | --- |
| `subRange` | `string` | The sub-range to check. |
| `superRange` | `string` | The super-range to check. |
| `options` | `object` | The options to pass to the semver.subset function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `boolean` - - `true` if `subRange` is a subset of `superRange`, `false` otherwise.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="validRange"></a>
### `validRange(range, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-range-ops.mjs#L14)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns a parsed, normalized range string or null if the range is invalid.


| Param | Type | Description |
| --- | --- | --- |
| `range` | `string` | The range to parse. |
| `options` | `object` | The options to pass to the semver.validRange function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` \| `null` - - The parsed, normalized range string or null if the range is invalid.

__Category__: [Range operations](#global-function-Range-operations-index)

<a id="maxSatisfyingVersionString"></a>
### `maxSatisfyingVersionString(versions, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/max-satisfying-version-string.mjs#L13)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Like [maxVersion](maxVersion) but returns a string instead of a version object.


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to compare. |
| `options` | `object` | The options to pass to the compareHelper function. |
| `options.ignoreNonVersions` | `boolean` | Whether to ignore non-version strings. |

**Returns**: `string` \| `null` - - The maximum version string or null if no version strings are provided.

<a id="minSatisfyingVersionString"></a>
### `minSatisfyingVersionString(versions, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/min-satisfying-version-string.mjs#L13)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Like [minVersion](#minVersion) but returns a string instead of a version object.


| Param | Type | Description |
| --- | --- | --- |
| `versions` | `Array.<string>` | The versions to compare. |
| `options` | `object` | The options to pass to the compareHelper function. |
| `options.ignoreNonVersions` | `boolean` | Whether to ignore non-version strings. |

**Returns**: `string` \| `null` - - The minimum version string or null if no version strings are provided.

<a id="upperBound"></a>
### `upperBound(range)` ⇒ `string` <sup>↱<sup>[source code](./src/upper-bound.mjs#L10)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Finds the ceiling of a range. For '*', the ceiling is '*'. For specific versions or any range capped by a specific
version, the ceiling is that version. For any open-ended range, the ceiling is defined by a '<version>-0' range
function where 'verision-0' least range above the given range.


| Param | Type | Description |
| --- | --- | --- |
| `range` | `string` | The range to find the ceiling for. |

**Returns**: `string` - - Either '*', a specific version, or a '<version>-0'.

<a id="xSort"></a>
### `xSort()` <sup>↱<sup>[source code](./src/x-sort.mjs#L9)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Ascend sorts a mix of semver versions and x-range specified ranges (e.g., 1.2.* or 1.2.x). The ranges are sorted according to their highest version; e.g., 1.3.34 < 1.3.*. (I believe it can accept caret ranges too, but I would need to review the spec.)

<a id="clean"></a>
### `clean(version, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L109)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns a cleaned version string removing unecessary comparators and, if `options.loose` is true, fixing space
issues. Only works for versions, not ranges.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to clean. |
| `options` | `object` | The options to pass to the semver.clean function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `string` \| `null` - - The cleaned version string or null if the version is invalid.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="coerce"></a>
### `coerce(version, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L97)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Aggressively attempts to coerce a string into a valid semver string. Basically, starting from the left side of the
string, it looks for a digit and then includes anything to the right of the digit that looks like part of a semver.
So, 'Number 1!' -> '1.0.0', 'Upgrade 1.2 to 1.3' -> '1.2.0', etc.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to coerce. |
| `options` | `object` | The options to pass to the semver.coerce function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |
| `options.includePrerelease` | `boolean` | Unless true, prerelease tags (and build metadata) are stripped. If |
| `options.rtl` | `boolean` | Instead of searching for a digit from the left, start searching from the right. true, then they are preserved. |

**Returns**: `string` \| `null` - - The coerced version string or null if the version is invalid.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="inc"></a>
### `inc(version, increment, options, identifier, identifierBase)` ⇒ `string` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L29)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns a new version string incremented by the specified part.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to increment. |
| `increment` | `string` | The increment to use. |
| `options` | `object` | The options to pass to the semver.inc function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |
| `options.includePrerelease` | `boolean` | Whether to include prerelease versions. |
| `identifier` | `string` | Used to specify the prerelease name for prerelease increments. |
| `identifierBase` | `false` \| `0` \| `1` | When incrementing to a new prerelease name, specifies the base number or `false` for no number. |

**Returns**: `string` - - The new version string.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="major"></a>
### `major(version, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L52)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the major version number.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to parse. |
| `options` | `object` | The options to pass to the semver.major function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - The major version number.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="minor"></a>
### `minor(version, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L63)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the minor version number.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to parse. |
| `options` | `object` | The options to pass to the semver.minor function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - The minor version number.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="nextVersion"></a>
### `nextVersion(currVer, increment)` ⇒ `string` <sup>↱<sup>[source code](./src/next-version.mjs#L23)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Given a current version generates the next version string accourding to `increment`. This method is similar to
[inc](#inc) from the [base semver library](https://semver.org) with two differences.
1) It supports a specific pre-release sequence prototype -> 'alpha' -> 'beta' -> 'rc' -> released and the 'pretype'
   increment will advance the prerelease ID through these stages.
2) The 'prerelease' increment can only be used to advance the prerelease version number and does not function as
   'prepatch' on a non-prerelease version.


| Param | Type | Description |
| --- | --- | --- |
| `currVer` | `string` | The current version to increment. |
| `increment` | `string` | The increment to use. |

**Returns**: `string` - - The next version string.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="parse"></a>
### `parse()` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L81)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Attempts to parse and normalize a string as a semver string. An aliase for [valid](#valid).

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="patch"></a>
### `patch(version, options)` ⇒ `number` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L74)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns the patch version number.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to parse. |
| `options` | `object` | The options to pass to the semver.patch function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `number` - - The patch version number.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="prerelease"></a>
### `prerelease(version, options)` ⇒ `Array.<string>` \| `null` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L41)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns an array of prerelease components or `null` if the version is not a prerelease. A 'component' is just a '.'
separated string.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to parse. |
| `options` | `object` | The options to pass to the semver.inc function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |

**Returns**: `Array.<string>` \| `null` - - The prerelease components or `null` if the version is not a prerelease.

__Category__: [Version operations](#global-function-Version-operations-index)

<a id="valid"></a>
### `valid(version, options)` ⇒ `string` \| `null` <sup>↱<sup>[source code](./src/semver-version-ops.mjs#L13)</sup></sup> <sup>⇧<sup>[global index](#global-function-index)</sup></sup>

Returns a parsed, normalized version string or null if the version is invalid.


| Param | Type | Description |
| --- | --- | --- |
| `version` | `string` | The version to parse. |
| `options` | `object` | The options to pass to the semver.valid function. |
| `options.loose` | `boolean` | Allow non-conforming, but recognizable semver strings. |
| `options.includePrerelease` | `boolean` | Whether to include prerelease versions. |

**Returns**: `string` \| `null` - - The parsed, normalized version string or null if the version is invalid.

__Category__: [Version operations](#global-function-Version-operations-index)

