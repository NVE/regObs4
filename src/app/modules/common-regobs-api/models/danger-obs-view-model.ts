/* eslint-disable */
export interface DangerObsViewModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst om faretegnet.
   */
  Comment?: string;
  DangerSignName?: string;

  /**
   * Faretegn er listet i tabellen DangerSignKD. The DangerSignKD unique identifier
   */
  DangerSignTID?: number;
  GeoHazardName?: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;
}
