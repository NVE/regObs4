/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface LandSlideObsDto {

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

  /**
   * Hvor startet skredet? Nordlig UTM sone uten desimaler.
   */
  UTMNorthStart?: number;

  /**
   * Hvor startet skredet? Østlig UTM sone uten desimaler.
   */
  UTMEastStart?: number;

  /**
   * Hvor startet skredet? UTM sone. Merk at kartene i norge ligger mellom UTM32 og 34.
   */
  UTMZoneStart?: number;

  /**
   * Hvor stoppet skredet? Nordlig UTM sone uten desimaler.
   */
  UTMNorthStop?: number;

  /**
   * Hvor stoppet skredet? Østlig UTM sone uten desimaler.
   */
  UTMEastStop?: number;

  /**
   * Hvor stoppet skredet? UTM sone. Merk at kartene i norge ligger mellom UTM32 og 34.
   */
  UTMZoneStop?: number;

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

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

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
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
  Urls?: Array<UrlViewModel>;
}
