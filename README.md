# friction-box-plugins

Third-party FrictionBox plugins by [justinmeimar](https://github.com/justinmeimar).

## Plugins

| Plugin | Category | Description |
|--------|----------|-------------|
| [Abstract Loading](plugins/abstract-loading/) | reflect | WebGL shader animations — liquid light while you wait |
| [Rustlings](plugins/rustlings/) | train | Learn Rust one exercise at a time with a skill tree |
| [Coding Polyglot](plugins/polyglot/) | train | Code reading challenges across programming languages |

## Structure

```
plugins/
  <plugin-id>/
    manifest.json    # Plugin metadata, fields, connectors
    src/             # Svelte component source
registry.json        # Aggregated index for the plugin store
```

## Registry

The `registry.json` at the repo root is fetched by the FrictionBox plugin store to display available community plugins. Each entry contains the plugin manifest metadata plus store-specific fields (`downloads`, `verified`, `authorAvatar`).
