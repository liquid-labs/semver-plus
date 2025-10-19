const compareHelper = (versions, semverTest) => {
  let currLead
  for (let i = 0; i < versions.length; i += 1) {
    const testVer = versions[i]
    if (currLead === undefined) {
      currLead = testVer
    }
    else if (semverTest(currLead, testVer)) {
      currLead = testVer
    }
  }

  return currLead
}

export { compareHelper }
