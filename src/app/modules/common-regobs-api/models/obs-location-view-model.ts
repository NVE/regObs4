/* tslint:disable */
export interface ObsLocationViewModel {

  /**
   * ObsLocationID
   */
  ObsLocationID?: number;

  /**
   * Anngir varslingsregion stedet tilhører. Varslingsregioner gitt i ForecastRegionKD. The ForecastRegionKD unique identifier
   */
  ForecastRegionTID?: number;
  ForecastRegionName?: string;
  Height?: number;
  MunicipalName?: string;

  /**
   * Kommune nr stedet tilhører
   */
  MunicipalNo?: string;
  CountryId?: number;
  CountryName?: string;
  UTMSourceName?: string;

  /**
   * Read-only generert tittel
   */
  Title?: string;

  /**
   * Navn på stedet
   */
  LocationName?: string;

  /**
   * Beskriver stedet.
   */
  LocationDescription?: string;

  /**
   * Latitude
   */
  Latitude: number;

  /**
   * Longitude
   */
  Longitude: number;

  /**
   * Kildehenvisning på hvordan koordinaten er satt. (GPS i tlf, klikk i kart, osv). Verdier gitt i UTMSourceKD
   */
  UTMSourceTID?: number;

  /**
   * Usikkerhet i posisjon i meter. Anslås på web og i app hentes det fra gps.
   */
  Uncertainty?: number;
}
