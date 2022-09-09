/* eslint-disable */
export interface ObsLocationEditModel {

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

  /**
   * ObsLocationID
   */
  ObsLocationID?: number;

  /**
   * Kildehenvisning på hvordan koordinaten er satt. (GPS i tlf, klikk i kart, osv). Verdier gitt i UTMSourceKD
   */
  UTMSourceTID?: number;

  /**
   * Usikkerhet i posisjon i meter. Anslås på web og i app hentes det fra gps.
   */
  Uncertainty?: number;
}
