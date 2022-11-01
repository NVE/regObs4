/* tslint:disable */
import { UrlEditModel } from './url-edit-model';
export interface IncidentEditModel {

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;

  /**
   * Hvor mange var i skredet/vannet?
   */
  CasualtiesNum?: number;

  /**
   * Comment.
   */
  Comment?: string;

  /**
   * Skadeomfang. Hva var konsekvensen av hendelsen. Valgene gitt i DamageExtentKD. The DamageExtentKD unique identifier
   */
  DamageExtentTID?: number;

  /**
   * Hvor mange døde?
   */
  DeadNum?: number;

  /**
   * Om hendelsen strakte seg ut i tid, når sluttet den å gjelde? Feks, når åpnet veien igjen etter raset?
   */
  DtEndTime?: string;

  /**
   * Hvor mange evakuerte?
   */
  EvacuatedNum?: number;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is).
   */
  GeoHazardTID?: number;

  /**
   * Hvor mange vart skadd?
   */
  HarmedNum?: number;

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
  IncidentURLs?: Array<UrlEditModel>;

  /**
   * Hvor mange var involvert?
   */
  InvolvedNum?: number;

  /**
   * Hvor ofte er man i området?
   */
  LocalKnowledgeTID?: number;

  /**
   * Var man lokal, norsk eller utenlandsk turist?
   */
  LocalTouristTID?: number;

  /**
   * Er  det noen materielle skader?
   */
  MaterialDamages?: boolean;

  /**
   * Hvem gjennomførte redningen?
   */
  RescueTID?: number;

  /**
   * Var det noe sikkerhetsutstyr i bruk?
   */
  SafetyGearTID?: number;

  /**
   * Hvilken turfase?
   */
  SlopeActivityTID?: number;

  /**
   * Er  trafikk hindret?
   */
  TrafficObstructed?: boolean;
}
