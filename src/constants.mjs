export const xRangeRE =
  //  v single tuple  v doublpe tuple             v triple tuple            v quad/pre-release tuple
  //          v if there's more than a single digit, it can't lead with a zero
  /^(?:[Xx*]|[1-9]?[0-9]+\.[Xx*]|(?:[1-9]?[0-9]+\.){2}[Xx*]|(?:[1-9]?[0-9]+\.){2}[1-9]?[0-9]+-(?:alpha|beta|rc)\.[Xx*])$/
export const prereleaseXRangeRE = /^(?:[1-9]?[0-9]+\.){2}[1-9]?[0-9]+-(?:alpha|beta|rc)\.[Xx*]$/
