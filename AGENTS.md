You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project

Varsom RegObs app: an Ionic + Angular + Capacitor app for reporting natural hazard observations (snow/avalanche, ice, water/flood, soil/landslide, weather) to NVE's Regobs API. The same codebase ships as a web app (regobs.no) and as native iOS/Android apps. Most comments, commit messages and README sections are in Norwegian.

## Useful commands

Node/npm versions are pinned in `package.json` `engines` (node ^24, npm ^11; CI uses Node 24).

```bash
npm start                     # dev server on http://localhost:8100
npm run build                 # dev build -> www/
npm run build:prod            # production build (swaps in environment.prod.ts)
npm run lint                  # eslint over src - run after implementing changes
npm run prettier:fix          # printWidth 120, single quotes in TS
npm test                      # Karma/Jasmine, ChromeHeadless, single run
npx ng test --watch=false --include='src/app/core/services/draft/**/*.spec.ts'   # run a subset of specs
```

## Things to know

- **Security headers:** never edit `Content-Security-Policy`/`Permissions-Policy` by hand in `web.config`, `staticwebapp.config.json` or `src/index.html`. Edit `headers-update-scripts/*.config.ts` and run `npm run update-headers`. New external hosts (tiles, APIs) must be added there.
- **Translations:** only `nb` and `en` in `src/assets/i18n` are edited in this repo; other languages come from Lokalise through PRs (`translations/` scripts). Run `npm run translations:sort` after adding keys.
- `src/assets/apikey.json` is injected by CI from a secure file.
- **Releases:** pushing a `release/vX.Y.Z` branch triggers `pipelines/regobs-mobile-app-build-release.yml` (TestFlight / Google Play internal). Version bumps are made manually in `package.json` and then `npm install` to update the lockfile.
