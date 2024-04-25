/**
 * NB! Husk å legge til "{ provide: 'OnReset' ... }" i app.providers.ts i tillegg til å implementere OnReset interface
 */
export interface OnReset {
  appOnReset(): void | Promise<any>;
  appOnResetComplete?(): void | Promise<any>;
}
