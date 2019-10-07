/* tslint:disable */

/**
 * Skredaktivitet.
 */
export interface AvalancheActivityObsDto {

  /**
   * Unik id på denne tabellen da flere er mulig pr RegID.
   */
  AvalancheActivityObsID: number;

  /**
   * Hvilken side av fjellene har skredene gått? Gis i grader slik gitt på kompass. 0 er nord og 90 er øst osv.
   */
  Aspect: number;

  /**
   * Meter over havet på løsneområdet.
   */
  HeigthStartZone: number;

  /**
   * Når gikk skredene? Her bruker vi feltet som en ca. tid og brukerene oppfordres til å anta best mulig.
   */
  DtAvalancheTime: string;

  /**
   * Hvor store er skredene?. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Hvor mange skred er gått? The EstimatedNumKD unique identifier
   */
  EstimatedNumTID?: number;

  /**
   * Typen skred som er gått. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;

  /**
   * Hva utløste skredet? Det er ofte beskrevet som det svake laget i snødekket. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;

  /**
   * Hva slags terrengtype var det i løsneområdet. The TerrainStartZoneKD unique identifier
   */
  TerrainStartZoneTID?: number;

  /**
   * Hvor går snøgrensa i området?
   */
  SnowLine?: number;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm.
   */
  UsageFlagTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
}
