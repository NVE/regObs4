/* eslint-disable */
import { Summary } from './summary';
import { AttachmentViewModel } from './attachment-view-model';
import { AvalancheActivityObsViewModel } from './avalanche-activity-obs-view-model';
import { AvalancheActivityObs2ViewModel } from './avalanche-activity-obs-2view-model';
import { AvalancheDangerObsViewModel } from './avalanche-danger-obs-view-model';
import { AvalancheEvalProblemViewModel } from './avalanche-eval-problem-view-model';
import { AvalancheEvalProblem2ViewModel } from './avalanche-eval-problem-2view-model';
import { AvalancheEvaluationViewModel } from './avalanche-evaluation-view-model';
import { AvalancheEvaluation2ViewModel } from './avalanche-evaluation-2view-model';
import { AvalancheEvaluation3ViewModel } from './avalanche-evaluation-3view-model';
import { AvalancheObsViewModel } from './avalanche-obs-view-model';
import { CompressionTestViewModel } from './compression-test-view-model';
import { DamageObsViewModel } from './damage-obs-view-model';
import { DangerObsViewModel } from './danger-obs-view-model';
import { GeneralObservationViewModel } from './general-observation-view-model';
import { IceCoverViewModel } from './ice-cover-view-model';
import { IceThicknessViewModel } from './ice-thickness-view-model';
import { IncidentViewModel } from './incident-view-model';
import { LandslideViewModel } from './landslide-view-model';
import { ObsLocationViewModel } from './obs-location-view-model';
import { ObserverViewModel } from './observer-view-model';
import { SnowCoverObsViewModel } from './snow-cover-obs-view-model';
import { SnowProfileViewModel } from './snow-profile-view-model';
import { SnowSurfaceViewModel } from './snow-surface-view-model';
import { WaterLevelViewModel } from './water-level-view-model';
import { Waterlevel2ViewModel } from './waterlevel-2view-model';
import { WeatherViewModel } from './weather-view-model';
export interface RegistrationViewModel {
  AttachmentSummaries?: Array<Summary>;
  Attachments?: Array<AttachmentViewModel>;
  AvalancheActivityObs?: Array<AvalancheActivityObsViewModel>;
  AvalancheActivityObs2?: Array<AvalancheActivityObs2ViewModel>;
  AvalancheDangerObs?: Array<AvalancheDangerObsViewModel>;
  AvalancheEvalProblem?: Array<AvalancheEvalProblemViewModel>;
  AvalancheEvalProblem2?: Array<AvalancheEvalProblem2ViewModel>;
  AvalancheEvaluation?: AvalancheEvaluationViewModel;
  AvalancheEvaluation2?: AvalancheEvaluation2ViewModel;
  AvalancheEvaluation3?: AvalancheEvaluation3ViewModel;
  AvalancheObs?: AvalancheObsViewModel;
  CompressionTest?: Array<CompressionTestViewModel>;
  DamageObs?: Array<DamageObsViewModel>;
  DangerObs?: Array<DangerObsViewModel>;

  /**
   * Timestamp for endret i systemet. (Read-Only)
   */
  DtChangeTime?: string;

  /**
   * Tiden da observasjonen ble gjort.
   */
  DtObsTime: string;

  /**
   * Timestamp for registrert i systemet. (Read-Only)
   */
  DtRegTime?: string;

  /**
   * Ekstern referanse ID. Må være unik for Applikasjon.
   */
  ExternalReferenceId?: string;
  GeneralObservation?: GeneralObservationViewModel;
  GeoHazardName?: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;
  IceCoverObs?: IceCoverViewModel;
  IceThickness?: IceThicknessViewModel;
  Incident?: IncidentViewModel;
  LandSlideObs?: LandslideViewModel;
  ObsLocation?: ObsLocationViewModel;
  Observer?: ObserverViewModel;
  ObserverGroupID?: number;
  ObserverGroupName?: string;
  RegId?: number;
  SnowCoverObs?: SnowCoverObsViewModel;
  SnowProfile?: AttachmentViewModel;
  SnowProfile2?: SnowProfileViewModel;
  SnowSurfaceObservation?: SnowSurfaceViewModel;
  SourceName?: string;

  /**
   * Kildereferanse på en registrering. F.eks. har brukeren sette dette selv eller er det referert til fra nyheter. The SourceKD unique identifier
   */
  SourceTID?: number;
  Summaries?: Array<Summary>;
  WaterLevel?: WaterLevelViewModel;
  WaterLevel2?: Waterlevel2ViewModel;
  WeatherObservation?: WeatherViewModel;
}
