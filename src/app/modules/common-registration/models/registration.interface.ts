import { SyncStatus } from './sync-status.enum';
import { RegistrationEditModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { GeoHazard } from 'src/app/modules/common-core/models';
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
