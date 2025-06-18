/*
  Oppdaterer verdiene for Content-Security-Policy (CSP) og Permissions-Policy headerne i alle tre konfigurasjonsfilene:
  - index.html (uten frame-ancestors)
  - web.config
  - staticwebapp.config.json

  Scriptet genererer strenger basert på konfigurasjonene i contentSecurityPolicy.config.ts og permissionsPolicy.config.ts,
  og oppdaterer de relevante filene. Dette scriptet skal kjøres manuelt når verdiene endres.
*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import cspConfig from './contentSecurityPolicy.config';
import permissionsPolicyConfig from './permissionsPolicy.config';

/**
 * Genererer en Content-Security-Policy-streng basert på konfigurasjonen.
 * @param config - CSP-konfigurasjonen som et objekt.
 * @returns En streng som representerer CSP-direktivene.
 */
function generateCspString(config: Record<string, string[] | boolean>): string {
  return Object.entries(config)
    .map(([directive, value]) => {
      if (value === true) {
        return directive; // For boolske flagg som 'upgrade-insecure-requests'
      }
      if (Array.isArray(value)) {
        return `${directive} ${value.join(' ')}`; // Slår sammen array-verdier med mellomrom
      }
      return `${directive} ${value}`; // For andre verdier
    })
    .join('; ');
}

/**
 * Genererer en Permissions-Policy-streng basert på konfigurasjonen.
 * @param config - Permissions-Policy-konfigurasjonen som et objekt.
 * @returns En streng som representerer Permissions-Policy-direktivene.
 */
function generatePermissionsPolicyString(config: Record<string, string>): string {
  return Object.entries(config)
    .map(([directive, value]) => `${directive}=${value}`)
    .join(', ');
}

const cspString = generateCspString(cspConfig);
const permissionsPolicyString = generatePermissionsPolicyString(permissionsPolicyConfig);

// Oppdater web.config
const webConfigPath = path.join(__dirname, '../web.config');
let webConfig = fs.readFileSync(webConfigPath, 'utf8');
webConfig = webConfig
  .replace(
    /<add\s+name="Content-Security-Policy"\s+value="[^"]*"\s*\/?>/,
    `<add name="Content-Security-Policy" value="${cspString}" />`
  )
  .replace(
    /<add\s+name="Permissions-Policy"\s+value="[^"]*"\s*\/?>/,
    `<add name="Permissions-Policy" value="${permissionsPolicyString}" />`
  );
fs.writeFileSync(webConfigPath, webConfig, 'utf8');

// Oppdater staticwebapp.config.json
const staticWebAppConfigPath = path.join(__dirname, '../staticwebapp.config.json');
const staticWebAppConfig = JSON.parse(fs.readFileSync(staticWebAppConfigPath, 'utf8'));
staticWebAppConfig.globalHeaders['Content-Security-Policy'] = cspString;
staticWebAppConfig.globalHeaders['Permissions-Policy'] = permissionsPolicyString;
fs.writeFileSync(staticWebAppConfigPath, JSON.stringify(staticWebAppConfig, null, 2), 'utf8');

// Oppdater index.html
const indexPath = path.join(__dirname, '../src/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const cspStringForIndexHtml = cspString
  .split('; ')
  // fjern frame-ancestors - den støttes ikke i <meta> tag
  .filter((directive) => !directive.startsWith('frame-ancestors'))
  // fjern upgrade-insecure-requests, den kræsjer localhost i safari
  .filter((directive) => !directive.startsWith('upgrade-insecure-requests'))
  .join('; ');
indexHtml = indexHtml.replace(
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?>/,
  `<meta http-equiv="Content-Security-Policy" content="${cspStringForIndexHtml}" />`
);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
