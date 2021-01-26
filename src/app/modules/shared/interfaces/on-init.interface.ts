export interface OnInit {
  appOnInit(): void | Promise<any>;
  appOnInitComplete?(): void | Promise<any>;
}
