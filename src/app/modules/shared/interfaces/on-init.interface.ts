export interface OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appOnInit(): void | Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appOnInitComplete?(): void | Promise<any>;
}
