---
applyTo: 'src/**/*.ts,src/**/*.html'
---

# Angular and TypeScript

- Use strict typing, prefer inference when the type is clear, and use `unknown` rather than `any` when a value's type is uncertain.
- Use standalone components; do not set `standalone: true` because it is the default in Angular 22.
- Do not set `ChangeDetectionStrategy.OnPush` explicitly; it is the default in Angular 22.
- Use signals for local state, `computed()` for derived values, and pure, predictable transformations. Use `update()` or `set()`, not signal mutation.
- Use `input()`, `output()`, and `model()` instead of the corresponding decorators or paired input/output for two-way state.
- Prefer Signal Forms (`@angular/forms/signals`) for new forms
- Implement lazy loading for feature routes.
- Use the `host` metadata property instead of `@HostBinding` or `@HostListener`.
- For new singleton services, prefer the project's `@Service` decorator over `@Injectable({ providedIn: 'root' })`.
- Design services around a single responsibility
- Use `inject()` rather than constructor injection.
- Prefer inline templates for small components.
- Keep templates simple and avoid complex logic
- Use `NgOptimizedImage` for static images; it does not support inline base64 images.
- Meet WCAG AA requirements, including focus management, contrast, and ARIA semantics; changes must pass axe checks.
- Use native template control flow (`@if`, `@for`, `@switch`), `class`/`style` bindings, and only the directives and pipes needed. Do not use `ngClass`, `ngStyle`, or import `CommonModule` just for convenience.
- Use the async pipe for observables. Do not assume globals such as `new Date()` are available in templates.
- Resolve external template and style paths relative to the component TypeScript file.
