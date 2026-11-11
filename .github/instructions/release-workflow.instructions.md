---
applyTo: 'package.json,package-lock.json,pipelines/**,appstore/**'
---

# Release workflow

- Release pipelines are triggered nightly from develop to TestFlight and Google Play internal testing
- Manual releases can be triggered from Azure Devops by a human.
- Version bumps are made manually in `package.json`; run `npm install` to update the lockfile.
