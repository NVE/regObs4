/* tslint:disable */
export interface ObsLocationDto {

  /**
   * Nordlig UTM sone uten desimaler
   */
  UTMNorth?: number;

  /**
   * Latitude
   */
  Latitude?: number;

  /**
   * ObsLocationID
   */
  ObsLocationID?: number;

  /**
   * Navn på stedet
   */
  LocationName?: string;

  /**
   * UTM sone. Merk at kartene i norge ligger mellom UTM32 og 34
   */
  UTMZone?: number;

  /**
   * Østlig UTM sone uten desimaler
   */
  UTMEast?: number;

  /**
   * Longitude
   */
  Longitude?: number;

  /**
   * Kildehenvisning på hvordan koordinaten er satt. (GPS i tlf, klikk i kart, osv). Verdier gitt i UTMSourceKD
   */
  UTMSourceTID?: number;

  /**
   * Anngir varslingsregion stedet tilhører. Varslingsregioner gitt i ForecastRegionKD. The ForecastRegionKD unique identifier
   */
  ForecastRegionTID?: number;

  /**
   * Kommune nr stedet tilhører
   */
  MunicipalNo?: string;

  /**
   * Beskriver stedet.
   */
  LocationDescription?: string;

  /**
   * Kommentarfelt brukt av systemet. Altså vises ikke til brukerne.
   */
  Comment?: string;

  /**
   * Usikkerhet i posisjon i meter. Anslås på web og i app hentes det fra gps.
   */
  Uncertainty?: number;
}
