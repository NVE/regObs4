/**
 * If a registration is changed locally or not
 */
export enum SyncStatus {
  /**
   * New registration or changes made locally, which is not sent to server (yet)
   */
  Draft = 'draft',

  /**
   * Registration is on its way to the server, but we have not confirmed that it is received (yet)
   */
  Sync = 'sync',

  /**
   * Registration is not changed locally. Same version exists on server
   */
  InSync = 'in-sync'
}
