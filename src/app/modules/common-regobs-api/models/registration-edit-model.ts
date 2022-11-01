/* tslint:disable */
import { AttachmentEditModel } from './attachment-edit-model';
import { AvalancheActivityObs2EditModel } from './avalanche-activity-obs-2edit-model';
import { AvalancheEvalProblem2EditModel } from './avalanche-eval-problem-2edit-model';
import { AvalancheEvaluation3EditModel } from './avalanche-evaluation-3edit-model';
import { AvalancheObsEditModel } from './avalanche-obs-edit-model';
import { CompressionTestEditModel } from './compression-test-edit-model';
import { DamageObsEditModel } from './damage-obs-edit-model';
import { DangerObsEditModel } from './danger-obs-edit-model';
import { GeneralObservationEditModel } from './general-observation-edit-model';
import { IceCoverEditModel } from './ice-cover-edit-model';
import { IceThicknessEditModel } from './ice-thickness-edit-model';
import { IncidentEditModel } from './incident-edit-model';
import { LandslideEditModel } from './landslide-edit-model';
import { ObsLocationEditModel } from './obs-location-edit-model';
import { SnowProfileEditModel } from './snow-profile-edit-model';
import { SnowSurfaceEditModel } from './snow-surface-edit-model';
import { Waterlevel2EditModel } from './waterlevel-2edit-model';
import { WeatherEditModel } from './weather-edit-model';
export interface RegistrationEditModel {

  /**
   * If set to true, the user's account will not be shown publicly. NVE will still be able to see who sent in the observation.
   */
  Anonymous?: boolean;
  Attachments?: Array<AttachmentEditModel>;
  AvalancheActivityObs2?: Array<AvalancheActivityObs2EditModel>;
  AvalancheEvalProblem2?: Array<AvalancheEvalProblem2EditModel>;
  AvalancheEvaluation3?: AvalancheEvaluation3EditModel;
  AvalancheObs?: AvalancheObsEditModel;
  CompressionTest?: Array<CompressionTestEditModel>;
  DamageObs?: Array<DamageObsEditModel>;
  DangerObs?: Array<DangerObsEditModel>;
  DtChangeTime?: string;

  /**
   * Tiden da observasjonen ble gjort.
   */
  DtObsTime: string;
  GeneralObservation?: GeneralObservationEditModel;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;
  IceCoverObs?: IceCoverEditModel;
  IceThickness?: IceThicknessEditModel;
  Incident?: IncidentEditModel;
  LandSlideObs?: LandslideEditModel;

  /**
   * The observation location object. Latitude and longitute are needed to create a new registration.
   */
  ObsLocation?: ObsLocationEditModel;
  ObserverGroupID?: number;
  ObserverGroupName?: string;
  SnowProfile2?: SnowProfileEditModel;
  SnowSurfaceObservation?: SnowSurfaceEditModel;

  /**
   * Kildereferanse på en registrering. F.eks. har brukeren sette dette selv eller er det referert til fra nyheter. The SourceKD unique identifier
   */
  SourceTID?: number;
  WaterLevel2?: Waterlevel2EditModel;
  WeatherObservation?: WeatherEditModel;
}
