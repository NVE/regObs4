import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { AttachmentEditModel, AttachmentViewModel, RegistrationEditModel } from 'src/app/modules/common-regobs-api';

// eslint-disable-next-line @typescript-eslint/ban-types
// If we want to make RegistrationEditModel immutable, use Immutable<RegistrationEditModel>
// type ImmutablePrimitive = undefined | null | boolean | string | number | Function;
// type Immutable<T> =
//   T extends ImmutablePrimitive ? T :
//   T extends Array<infer U> ? ImmutableArray<U> :
//   ImmutableObject<T>;
// type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
// type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

export declare const enum RegistrationDraftErrorCode {
  NoNetworkOrTimedOut = 0,
  AttachmentError = 10,
  RegistrationError = 20,
  ConflictError = 25,
  ServerError = 30,
  Unknown = 40,
}

export interface RegistrationDraftError {
  code: RegistrationDraftErrorCode;
  timestamp?: number;
  message?: string;
}

export type RemoteOrLocalAttachmentEditModel = Pick<AttachmentViewModel, 'Url' | 'UrlFormats'> & AttachmentEditModel;

export interface RegistrationEditModelWithRemoteOrLocalAttachments extends Omit<RegistrationEditModel, 'Attachments'> {
  Attachments?: RemoteOrLocalAttachmentEditModel[]
}

/**
 * A registration that is not submitted to the server (yet).
 * It can be a new registration or an earlier submitted registration changed by you.
 */
export interface RegistrationDraft {

  /** Unique Draft ID */
  readonly uuid: string;

  /**
   * Registration ID, for example 283962.
   *
   * Returned by regobs api when a registration is submitted.
   * Will only be used for reference when editing existing observations.
   */
  readonly regId?: number;

  /**
   * Timestamp in millis that changes each time we save the draft locally.
   * Do not mix with registration.DtChangeTime, which is last time the registration was saved in Regobs
   * @returns last saved time or undefined if not saved
   */
  readonly lastSavedTime?: number;

  /**
   * @see SyncStatus
   */
  readonly syncStatus: SyncStatus;

  /**
   * The registration to submit
   */
  readonly registration: RegistrationEditModelWithRemoteOrLocalAttachments;

  readonly error?: RegistrationDraftError;
}