/* eslint-disable */
import { UrlViewModel } from './url-view-model';
export interface IncidentViewModel {
  ActivityInfluencedName?: string;

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;

  /**
   * Comment.
   */
  Comment?: string;
  DamageExtentName?: string;

  /**
   * Skadeomfang. Hva var konsekvensen av hendelsen. Valgene gitt i DamageExtentKD. The DamageExtentKD unique identifier
   */
  DamageExtentTID?: number;

  /**
   * Om hendelsen strakte seg ut i tid, når sluttet den å gjelde? Feks, når åpnet veien igjen etter raset?
   */
  DtEndTime?: string;
  ForecastAccurateName?: string;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;
  GeoHazardName?: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is).
   */
  GeoHazardTID?: number;

  /**
   * Hendelsen beskrives med overskrift ..
   */
  IncidentHeader?: string;

  /**
   * .. med ingress eller sammendrag ..
   */
  IncidentIngress?: string;

  /**
   * .. og teksten eller artikkelen.
   */
  IncidentText?: string;

  /**
   * Provide description for IncidentURLs
   */
  IncidentURLs?: Array<UrlViewModel>;
}
