import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { IRegistration } from '../models/registration.interface';
import { KdvElementsResponseDto } from '@varsom-regobs-common/regobs-api';
import { HelptextDto } from '@varsom-regobs-common/regobs-api';
import { OfflineSyncMeta } from '../models/offline-sync-meta.interface';
import { ISyncProgressRecord } from '../models/sync-progress-record.interface';
import { IUplaodProgress } from '../models/upload-progress.interface';
import { AttachmentUploadEditModel } from '../registration.models';

export type RxRegistrationDocument = RxDocument<IRegistration>;
export type RxKdvDocument = RxDocument<OfflineSyncMeta<KdvElementsResponseDto>>;
export type RxHelpTextDocument = RxDocument<OfflineSyncMeta<HelptextDto[]>>;
export type RxAttachmentMetaDocument = RxDocument<AttachmentUploadEditModel>;
export type RxRegistrationSyncProgressDocument = RxDocument<ISyncProgressRecord>;
export type RxUploadProgressDocument = RxDocument<IUplaodProgress>;

export type RxRegistrationCollection = RxCollection<IRegistration>;
export type RxKdvCollection = RxCollection<OfflineSyncMeta<KdvElementsResponseDto>>;
export type RxHelpTextCollection = RxCollection<OfflineSyncMeta<HelptextDto[]>>;
export type RxAttachmentMetaCollection = RxCollection<AttachmentUploadEditModel>;
export type RxRegistrationSyncProgressCollection = RxCollection<ISyncProgressRecord>;
export type RxUploadProgressCollection = RxCollection<IUplaodProgress>;

export type RxRegistrationCollections =
    RxRegistrationCollection |
    RxKdvCollection |
    RxHelpTextCollection |
    RxAttachmentMetaCollection |
    RxRegistrationSyncProgressCollection |
    RxUploadProgressCollection;

export type RxRegistrationDatabase = RxDatabase<{[key: string]: RxRegistrationCollections}>;