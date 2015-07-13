SHELL:=/bin/bash -O extglob  # need `shopt -s extglob`
PROJECT=calculator
ROOT_DIR=$(shell pwd)
PROJECT_DIR=$(ROOT_DIR)/$(PROJECT)
BUILD_DIR=$(ROOT_DIR)/build

.PHONY: build css js


build: clean css js

css: static
	lessc $(BUILD_DIR)/css/styles.less > $(BUILD_DIR)/css/styles.css
	java -jar utils/yuicompressor-2.4.8.jar $(BUILD_DIR)/css/styles.css -o $(BUILD_DIR)/css/styles.min.css

js: static
	r.js -o $(BUILD_DIR)/js/build.js
	java -jar utils/yuicompressor-2.4.8.jar $(BUILD_DIR)/js/main.compiled.js -o $(BUILD_DIR)/js/main.min.js

debug: static
	lessc $(BUILD_DIR)/less/styles.less > $(BUILD_DIR)/less/styles.min.css
	nodejs $(BUILD_DIR)/js/libs/r.js -o $(BUILD_DIR)/js/build.js optimize=none
	cp $(BUILD_DIR)/js/main.compiled.js $(BUILD_DIR)/js/main.min.js

static:
	git checkout master
	mkdir -p $(BUILD_DIR)
	rsync -avzh $(PROJECT_DIR)/ $(BUILD_DIR)

site: clean_site
	git checkout gh-pages
	rsync -avzh $(BUILD_DIR)/ $(ROOT_DIR)

clean_site:
	git checkout gh-pages
	rm -rf !(Makefile|build)

clean:
	rm -rf $(BUILD_DIR)
