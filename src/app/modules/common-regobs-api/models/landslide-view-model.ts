/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface LandslideViewModel {
  ActivityInfluencedName?: string;

  /**
   * Hva ble påvirket av hendelsen. Valgene er gitt i ActivityInfluencedKD. The ActivityInfluencedKD unique identifier
   */
  ActivityInfluencedTID?: number;
  Comment?: string;
  DamageExtentName?: string;

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
   * Hull of avalanche polygon, List(lon, lat)
   */
  Extent?: Array<Array<number>>;
  ForecastAccurateName?: string;

  /**
   * Var det et varsel utstedt og stemte det? The ForecastAccurateKD unique identifier
   */
  ForecastAccurateTID?: number;
  GeoHazardName?: string;

  /**
   * Spesifiser skredtype. vått jordskred?, jordskred eller steinskred? GeoHazardTID = 20, 30 og 40 er aktuelle. The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;
  LandSlideName?: string;
  LandSlideSizeName?: string;

  /**
   * Hvor stort er skredet? The LandSlideSizeKD unique identifier
   */
  LandSlideSizeTID?: number;

  /**
   * Hva slags type skred er det snakk om? Valg gitt i LandSlideKD. The LandSlideKD unique identifier
   */
  LandSlideTID?: number;
  LandSlideTriggerName?: string;

  /**
   * Hva utløste skredet? The LandSlideTriggerKD unique identifier
   */
  LandSlideTriggerTID?: number;

  /**
   * Hull of avalanche starting zone, List(lon, lat)
   */
  StartExtent?: Array<Array<number>>;

  /**
   * Latitude start posisjon
   */
  StartLat?: number;

  /**
   * Long start posisjon
   */
  StartLong?: number;

  /**
   * Hull of avalanche runout zone, List(lon, lat)
   */
  StopExtent?: Array<Array<number>>;

  /**
   * Latitude stopp posisjon
   */
  StopLat?: number;

  /**
   * Long stopp posisjon
   */
  StopLong?: number;
  Urls?: Array<UrlViewModel>;
}
