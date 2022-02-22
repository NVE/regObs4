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
   * Registration ID, for example 283962.
   *
   * Returned by regobs api when a registration is submitted.
   * Will only be used for reference when editing existing observations.
   */
  regId?: number;

  /**
   * Timestamp in millis that changes each time we save the draft locally.
   * Do not mix with registration.DtChangeTime, which is last time the registration was saved in Regobs
   * @returns last saved time or undefined if not saved
   */
  lastSavedTime?: number;

  /**
   * @see SyncStatus
   */
  syncStatus: SyncStatus;

  /**
   * The registration to submit
   */
  registration: RegistrationEditModel;
}