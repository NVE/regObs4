/* tslint:disable */
import { IncidentUrlsDto } from './incident-urls-dto';
export interface IncidentDto {

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is).
   */
  GeoHazardTID?: number;

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;

  /**
   * Skadeomfang. Hva var konsekvensen av hendelsen. Valgene gitt i DamageExtentKD. The DamageExtentKD unique identifier
   */
  DamageExtentTID?: number;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;

  /**
   * Om hendelsen strakte seg ut i tid, når sluttet den å gjelde? Feks, når åpnet veien igjen etter raset?
   */
  DtEndTime?: string;

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
   * Vi har lagt opp til et felt for internkommentar. Denne kolonnen vises ikke på tjenestelaget og i view.
   */
  SensitiveText?: string;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Comment.
   */
  Comment?: string;

  /**
   * Provide description for IncidentURLs
   */
  IncidentURLs?: Array<IncidentUrlsDto>;
}
