import { SyncStatus } from './sync-status.enum';
import { RegistrationEditModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { RegistrationTid } from './registration-tid.enum';

/**  @deprecated use draft model */
export interface IRegistration {
  /**  @deprecated use draft model */
  id: string;
  /**  @deprecated use draft model */
  changed: number;
  /**  @deprecated use draft model */
  geoHazard: GeoHazard;
  /**  @deprecated use draft model */
  syncStatus: SyncStatus;
  /**  @deprecated use draft model */
  lastSync?: number;
  /**  @deprecated use draft model */
  syncError?: string;
  /**  @deprecated use draft model */
  syncStatusCode?: number;
  /**  @deprecated use draft model */
  request: RegistrationEditModel;
  /**  @deprecated use draft model */
  response?: RegistrationViewModel;
  /**  @deprecated use draft model */
  changedRegistrationTid?: RegistrationTid;
}
