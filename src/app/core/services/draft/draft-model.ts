import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationEditModel } from 'src/app/modules/common-regobs-api';

/**
 * A registration that is not submitted to the server (yet).
 * It can be a new registration or an earlier submitted registration changed by you.
 */
export interface RegistrationDraft {

  /** Unique ID. Will never change */
  uuid: string;

  /**
   * @see SyncStatus
   */
  syncStatus: SyncStatus;

  /**
   * The registration to submit
   */
  draft: RegistrationEditModel;
}