install:
    bun install

build:
    bun scripts/build-all.js

dev plugin:
    cd plugins && bunx frictionbox dev {{plugin}}

build-one plugin:
    cd plugins && bunx frictionbox build {{plugin}} --registry
