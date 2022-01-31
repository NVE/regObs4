/* tslint:disable */
export interface AvalancheActivityObsViewModel {

  /**
   * Unik id på denne tabellen da flere er mulig pr RegID.
   */
  AvalancheActivityObsID?: number;

  /**
   * Hvilken side av fjellene har skredene gått? Gis i grader slik gitt på kompass. 0 er nord og 90 er øst osv.
   */
  Aspect?: number;

  /**
   * Meter over havet på løsneområdet.
   */
  HeigthStartZone?: number;

  /**
   * Når gikk skredene? Her bruker vi feltet som en ca. tid og brukerene oppfordres til å anta best mulig.
   */
  DtAvalancheTime?: string;

  /**
   * Hvor store er skredene?. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;
  DestructiveSizeName?: string;

  /**
   * Hvor mange skred er gått? The EstimatedNumKD unique identifier
   */
  EstimatedNumTID?: number;
  EstimatedNumName?: string;

  /**
   * Typen skred som er gått. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;
  AvalancheName?: string;

  /**
   * Hva utløste skredet? Det er ofte beskrevet som det svake laget i snødekket. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;
  AvalancheTriggerName?: string;

  /**
   * Hva slags terrengtype var det i løsneområdet. The TerrainStartZoneKD unique identifier
   */
  TerrainStartZoneTID?: number;
  TerrainStartZoneName?: string;

  /**
   * Hvor går snøgrensa i området?
   */
  SnowLine?: number;
  SnowLineName?: string;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
  DtOffAvalancheTime?: string;
}
