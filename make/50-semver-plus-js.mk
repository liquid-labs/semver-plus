# This file was generated by @liquid-labs/sdlc-projects-workflow-node-build. Refer
# to https://npmjs.com/package/@liquid-labs/sdlc-projects-workflow-node-build for
# further details

#####
# build dist/semver-plus.js
#####

SDLC_SEMVER_PLUS_JS:=$(DIST)/semver-plus.js
SDLC_SEMVER_PLUS_JS_ENTRY=$(SRC)/index.js
BUILD_TARGETS+=$(SDLC_SEMVER_PLUS_JS)

$(SDLC_SEMVER_PLUS_JS): package.json $(SDLC_ALL_NON_TEST_JS_FILES_SRC)
	JS_BUILD_TARGET=$(SDLC_SEMVER_PLUS_JS_ENTRY) \
	  JS_OUT=$@ \
	  $(SDLC_ROLLUP) --config $(SDLC_ROLLUP_CONFIG)

#####
# end dist/semver-plus.js
#####
