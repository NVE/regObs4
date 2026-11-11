---
applyTo: "headers-update-scripts/**,web.config,staticwebapp.config.json,src/index.html"
---

# Security headers

- Do not edit `Content-Security-Policy` or `Permissions-Policy` directly in `web.config`, `staticwebapp.config.json`, or `src/index.html`.
- Make header changes in the relevant configuration under `headers-update-scripts/`, then run `npm run update-headers`.
- Add every new external host used by the app (including tile and API hosts) to the appropriate policy configuration.