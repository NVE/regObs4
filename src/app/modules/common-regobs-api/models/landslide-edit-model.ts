/* tslint:disable */
import { UrlEditModel } from './url-edit-model';
export interface LandslideEditModel {

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;
  Comment?: string;

  /**
   * Skadeomfang. Hva var konsekvensen av hendelsen. Valgene gitt i DamageExtentKD. The DamageExtentKD unique identifier
   */
  DamageExtentTID?: number;

  /**
   * Når gikk skredet? Dette er ikke det samme tidspunktet da skredet ble observert.
   */
  DtLandSlideTime: string;

  /**
   * Når stoppet skredet?
   */
  DtLandSlideTimeEnd?: string;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;

  /**
   * Spesifiser skredtype. vått jordskred?, jordskred eller steinskred? GeoHazardTID = 20, 30 og 40 er aktuelle. The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Hvor stort er skredet? The LandSlideSizeKD unique identifier
   */
  LandSlideSizeTID?: number;

  /**
   * Hva slags type skred er det snakk om? Valg gitt i LandSlideKD. The LandSlideKD unique identifier
   */
  LandSlideTID?: number;

  /**
   * Hva utløste skredet? The LandSlideTriggerKD unique identifier
   */
  LandSlideTriggerTID?: number;

  /**
   * Latitude start posisjon
   */
  StartLat?: number;

  /**
   * Long start posisjon
   */
  StartLong?: number;

  /**
   * Latitude stopp posisjon
   */
  StopLat?: number;

  /**
   * Long stopp posisjon
   */
  StopLong?: number;
  Urls?: Array<UrlEditModel>;
}
