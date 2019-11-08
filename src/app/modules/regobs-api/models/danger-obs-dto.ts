/* tslint:disable */
export interface DangerObsDto {

  /**
   * Settes av systemet. Teller fra 0 og opp pr RegID
   */
  DangerObsID?: number;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Faretegn er listet i tabellen DangerSignKD. The DangerSignKD unique identifier
   */
  DangerSignTID: number;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om faretegnet.
   */
  Comment?: string;
}
