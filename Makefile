all: build

build:
	@echo "Building cockpit-project-zomboid into dist/"
	@mkdir -p dist
	@cp -r src static manifest.json README.md LICENSE dist/

clean:
	rm -rf dist

.PHONY: all build clean
