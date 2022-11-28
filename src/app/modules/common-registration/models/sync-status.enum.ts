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
   * @deprecated In the future we won't save any registrations locally, so this status will disappear
   */
  InSync = 'in-sync',

  /**
   * Same as Sync but will ignore version check in API an overwrite earlier versions
   */
  SyncAndIgnoreVersionCheck = 'sync-and-ignore-version-check'
}
