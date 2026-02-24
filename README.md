# userscripts

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

A collection of userscripts to facilitate certain tasks on different websites.

## Available userscripts

- [psnprofilesSearch](src/psnprofilesSearch.user.js): Search for a game on PlayStation Store.
- [pypiCopy](src/pypiCopy.user.js): Copy the package name and version as a requirement to the clipboard.
- [pypiLinks](src/pypiLinks.user.js): Supplement packages with extra links for more information.

## Development

Install [fnm](https://github.com/Schniz/fnm) (if necessary).

```bash
fnm install && fnm use && node --version && npm --version
```

```bash
npm install
```

```bash
npm run format
```
