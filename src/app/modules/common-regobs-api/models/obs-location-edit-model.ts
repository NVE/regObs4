/* tslint:disable */
export interface ObsLocationEditModel {

  /**
   * ObsLocationID
   */
  ObsLocationID?: number;

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
