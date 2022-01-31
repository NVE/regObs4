/* tslint:disable */
import { ObsLocationEditModel } from './obs-location-edit-model';
import { AttachmentEditModel } from './attachment-edit-model';
import { AvalancheActivityObs2EditModel } from './avalanche-activity-obs-2edit-model';
import { AvalancheEvalProblem2EditModel } from './avalanche-eval-problem-2edit-model';
import { AvalancheEvaluation3EditModel } from './avalanche-evaluation-3edit-model';
import { AvalancheObsEditModel } from './avalanche-obs-edit-model';
import { CompressionTestEditModel } from './compression-test-edit-model';
import { DangerObsEditModel } from './danger-obs-edit-model';
import { GeneralObservationEditModel } from './general-observation-edit-model';
import { IceCoverEditModel } from './ice-cover-edit-model';
import { IceThicknessEditModel } from './ice-thickness-edit-model';
import { IncidentEditModel } from './incident-edit-model';
import { LandslideEditModel } from './landslide-edit-model';
import { SnowProfileEditModel } from './snow-profile-edit-model';
import { SnowSurfaceEditModel } from './snow-surface-edit-model';
import { WeatherEditModel } from './weather-edit-model';
import { Waterlevel2EditModel } from './waterlevel-2edit-model';
import { DamageObsEditModel } from './damage-obs-edit-model';
export interface RegistrationEditModel {

  /**
   * The observation location object. Latitude and longitute are needed to create a new registration.
   */
  ObsLocation?: ObsLocationEditModel;
  Attachments?: Array<AttachmentEditModel>;
  AvalancheActivityObs2?: Array<AvalancheActivityObs2EditModel>;
  AvalancheEvalProblem2?: Array<AvalancheEvalProblem2EditModel>;
  AvalancheEvaluation3?: AvalancheEvaluation3EditModel;
  AvalancheObs?: AvalancheObsEditModel;
  CompressionTest?: Array<CompressionTestEditModel>;
  DangerObs?: Array<DangerObsEditModel>;
  GeneralObservation?: GeneralObservationEditModel;
  IceCoverObs?: IceCoverEditModel;
  IceThickness?: IceThicknessEditModel;
  Incident?: IncidentEditModel;
  LandSlideObs?: LandslideEditModel;
  SnowProfile2?: SnowProfileEditModel;
  SnowSurfaceObservation?: SnowSurfaceEditModel;
  WeatherObservation?: WeatherEditModel;
  WaterLevel2?: Waterlevel2EditModel;
  DamageObs?: Array<DamageObsEditModel>;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;

  /**
   * Kildereferanse på en registrering. F.eks. har brukeren sette dette selv eller er det referert til fra nyheter. The SourceKD unique identifier
   */
  SourceTID?: number;

  /**
   * Tiden da observasjonen ble gjort.
   */
  DtObsTime: string;
  DtChangeTime?: string;
  ObserverGroupID?: number;
  ObserverGroupName?: string;
}
