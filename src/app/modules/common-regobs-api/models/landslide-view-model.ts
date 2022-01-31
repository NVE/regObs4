/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface LandslideViewModel {
  LandSlideName?: string;
  LandSlideTriggerName?: string;
  LandSlideSizeName?: string;
  GeoHazardName?: string;
  ActivityInfluencedName?: string;
  ForecastAccurateName?: string;
  DamageExtentName?: string;
  Urls?: Array<UrlViewModel>;

  /**
   * Hva slags type skred er det snakk om? Valg gitt i LandSlideKD. The LandSlideKD unique identifier
   */
  LandSlideTID?: number;

  /**
   * Hva utløste skredet? The LandSlideTriggerKD unique identifier
   */
  LandSlideTriggerTID?: number;

  /**
   * Hvor stort er skredet? The LandSlideSizeKD unique identifier
   */
  LandSlideSizeTID?: number;
  Comment?: string;

  /**
   * Spesifiser skredtype. vått jordskred?, jordskred eller steinskred? GeoHazardTID = 20, 30 og 40 er aktuelle. The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;

  /**
   * Skadeomfang. Hva var konsekvensen av hendelsen. Valgene gitt i DamageExtentKD. The DamageExtentKD unique identifier
   */
  DamageExtentTID?: number;

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

  /**
   * Når gikk skredet? Dette er ikke det samme tidspunktet da skredet ble observert.
   */
  DtLandSlideTime: string;

  /**
   * Når stoppet skredet?
   */
  DtLandSlideTimeEnd?: string;
}
