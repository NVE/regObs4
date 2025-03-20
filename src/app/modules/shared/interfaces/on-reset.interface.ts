export interface OnReset {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appOnReset(): void | Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appOnResetComplete?(): void | Promise<any>;
}
