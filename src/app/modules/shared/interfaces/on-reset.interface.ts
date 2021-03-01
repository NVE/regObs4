export interface OnReset {
  appOnReset(): void | Promise<any>;
  appOnResetComplete?(): void | Promise<any>;
}
