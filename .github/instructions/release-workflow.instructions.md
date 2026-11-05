---
applyTo: 'package.json,package-lock.json,pipelines/**,appstore/**'
---

# Release workflow

- Release branches use the `release/vX.Y.Z` format. Pushing one triggers `pipelines/regobs-mobile-app-build-release.yml` for the mobile release process (TestFlight and Google Play internal testing).
- Never push a release branch.
- Version bumps are made manually in `package.json`; run `npm install` to update the lockfile.
