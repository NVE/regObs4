import { SyncStatus } from './sync-status.enum';
import { RegistrationEditModel, RegistrationViewModel } from '@varsom-regobs-common/regobs-api';
import { GeoHazard } from '@varsom-regobs-common/core';
import { RegistrationTid } from './registration-tid.enum';

export interface IRegistration {
    id: string;
    changed: number;
    geoHazard: GeoHazard;
    syncStatus: SyncStatus;
    lastSync?: number;
    syncError?: string;
    syncStatusCode?: number;
    request: RegistrationEditModel;
    response?: RegistrationViewModel;
    changedRegistrationTid?: RegistrationTid;
}
