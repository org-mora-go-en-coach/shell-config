# shell-config

Runtime source of truth for shell and MFE versions. Update `config.source.json` when promoting a remote, increment this package version, build, and deploy. The build emits `/config.json` and an immutable-looking `/<version>/config.json` copy.

`importmap/dev.json` and `importmap/prod.json` contain only MFE and API version selections for each environment. The build publishes them at `/importmap/dev.json` and `/importmap/prod.json`.

