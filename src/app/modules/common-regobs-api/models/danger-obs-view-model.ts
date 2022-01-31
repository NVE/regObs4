/* tslint:disable */
export interface DangerObsViewModel {
  GeoHazardName?: string;
  DangerSignName?: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Faretegn er listet i tabellen DangerSignKD. The DangerSignKD unique identifier
   */
  DangerSignTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om faretegnet.
   */
  Comment?: string;
}
