/* eslint-disable */
export interface ObsLocationViewModel {
  CountryId?: number;
  CountryName?: string;
  ForecastRegionName?: string;

  /**
   * Anngir varslingsregion stedet tilhører. Varslingsregioner gitt i ForecastRegionKD. The ForecastRegionKD unique identifier
   */
  ForecastRegionTID?: number;
  Height?: number;

  /**
   * Latitude
   */
  Latitude: number;

  /**
   * Beskriver stedet.
   */
  LocationDescription?: string;

  /**
   * Navn på stedet
   */
  LocationName?: string;

  /**
   * Longitude
   */
  Longitude: number;
  MunicipalName?: string;

  /**
   * Kommune nr stedet tilhører
   */
  MunicipalNo?: string;

  /**
   * ObsLocationID
   */
  ObsLocationID?: number;

  /**
   * Read-only generert tittel
   */
  Title?: string;
  UTMSourceName?: string;

  /**
   * Kildehenvisning på hvordan koordinaten er satt. (GPS i tlf, klikk i kart, osv). Verdier gitt i UTMSourceKD
   */
  UTMSourceTID?: number;

  /**
   * Usikkerhet i posisjon i meter. Anslås på web og i app hentes det fra gps.
   */
  Uncertainty?: number;
}
