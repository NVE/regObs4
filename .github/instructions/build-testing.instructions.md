---
applyTo: 'src/**/*.spec.ts,angular.json,package.json,tsconfig*.json'
---

# Build and testing

- The repository pins Node.js and npm versions in `package.json`.
- Run `npm run build` for a development build, `npm run build:prod` for a production build, and `npm run lint` after code changes.
- Run `npm test` for the project's single-run test command.
- To run specific spec files, use eg. `npx ng test --watch=false --include='src/app/core/services/draft/**/*.spec.ts'`.
- `npm run prettier:fix` formats files under `src` using the repository's Prettier configuration.
- There is no dedicated type-check script; use the Angular build and lint commands to validate changes.
