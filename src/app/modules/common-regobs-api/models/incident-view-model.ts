/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface IncidentViewModel {
  ActivityInfluencedName?: string;

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
  DamageExtentName?: string;

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
  IncidentURLs?: Array<UrlViewModel>;

  /**
   * Hvor mange var involvert?
   */
  InvolvedNum?: number;

  /**
   * Hvor ofte er man i området?
   */
  LocalKnowledgeName?: string;

  /**
   * Hvor ofte er man i området?
   */
  LocalKnowledgeTID?: number;

  /**
   * Var man lokal, norsk eller utenlandsk turist?
   */
  LocalTouristName?: string;

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
  RescueName?: string;

  /**
   * Hvem gjennomførte redningen?
   */
  RescueTID?: number;

  /**
   * Hadde man sikkerhetsutstyr?
   */
  SafetyGearName?: string;

  /**
   * Var det noe sikkerhetsutstyr i bruk?
   */
  SafetyGearTID?: number;

  /**
   * Hvilken turfase gjelder det?
   */
  SlopeActivityName?: string;

  /**
   * Hvilken turfase?
   */
  SlopeActivityTID?: number;

  /**
   * Er  trafikk hindret?
   */
  TrafficObstructed?: boolean;
}
