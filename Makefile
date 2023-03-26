.DELETE_ON_ERROR:
.PHONY: all build lint lint-fix qa test

default: build

CATALYST_SCRIPTS:=npx catalyst-scripts

VERSIONING_SRC:=src
VERSIONING_FILES:=$(shell find $(VERSIONING_SRC) \( -name "*.js" -o -name "*.mjs" \) -not -path "*/test/*" -not -name "*.test.js")
VERSIONING_ALL_FILES:=$(shell find $(VERSIONING_SRC) \( -name "*.js" -o -name "*.mjs" \))
VERSIONING_TEST_SRC_FILES:=$(shell find $(VERSIONING_SRC) -name "*.js")
VERSIONING_TEST_BUILT_FILES:=$(patsubst $(VERSIONING_SRC)/%, test-staging/%, $(VERSIONING_TEST_SRC_FILES))
VERSIONING_TEST_SRC_DATA:=$(shell find $(VERSIONING_SRC) -path "*/test/data/*" -type f)
VERSIONING_TEST_BUILT_DATA:=$(patsubst $(VERSIONING_SRC)/%, test-staging/%, $(VERSIONING_TEST_SRC_DATA))
VERSIONING:=dist/versioning.js

BUILD_TARGETS:=$(VERSIONING)

# build rules
build: $(BUILD_TARGETS)

all: build

$(VERSIONING): package.json $(VERSIONING_FILES)
	JS_SRC=$(VERSIONING_SRC) $(CATALYST_SCRIPTS) build

# test
$(VERSIONING_TEST_BUILT_DATA): test-staging/%: $(VERSIONING_SRC)/%
	@echo "Copying test data..."
	@mkdir -p $(dir $@)
	@cp $< $@

$(VERSIONING_TEST_BUILT_FILES) &: $(VERSIONING_ALL_FILES)
	JS_SRC=$(VERSIONING_SRC) $(CATALYST_SCRIPTS) pretest

last-test.txt: $(VERSIONING_TEST_BUILT_FILES) $(VERSIONING_TEST_BUILT_DATA)
	# JS_SRC=$(TEST_STAGING) $(CATALYST_SCRIPTS) test | tee last-test.txt
	( set -e; set -o pipefail; \
		JS_SRC=$(TEST_STAGING) $(CATALYST_SCRIPTS) test 2>&1 | tee last-test.txt; )

test: last-test.txt

# lint rules
last-lint.txt: $(ALL_SRC_FILES)
	( set -e; set -o pipefail; \
		JS_LINT_TARGET=$(VERSIONING_SRC) $(CATALYST_SCRIPTS) lint | tee last-lint.txt; )

lint: last-lint.txt	

lint-fix:
	JS_LINT_TARGET=$(VERSIONING_SRC) $(CATALYST_SCRIPTS) lint-fix

qa: test lint