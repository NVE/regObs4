/* tslint:disable */
export interface AvalancheActivityObsViewModel {

  /**
   * Hvilken side av fjellene har skredene gått? Gis i grader slik gitt på kompass. 0 er nord og 90 er øst osv.
   */
  Aspect?: number;

  /**
   * Unik id på denne tabellen da flere er mulig pr RegID.
   */
  AvalancheActivityObsID?: number;
  AvalancheName?: string;

  /**
   * Typen skred som er gått. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;
  AvalancheTriggerName?: string;

  /**
   * Hva utløste skredet? Det er ofte beskrevet som det svake laget i snødekket. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
  DestructiveSizeName?: string;

  /**
   * Hvor store er skredene?. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Når gikk skredene? Her bruker vi feltet som en ca. tid og brukerene oppfordres til å anta best mulig.
   */
  DtAvalancheTime?: string;
  DtOffAvalancheTime?: string;
  EstimatedNumName?: string;

  /**
   * Hvor mange skred er gått? The EstimatedNumKD unique identifier
   */
  EstimatedNumTID?: number;

  /**
   * Meter over havet på løsneområdet.
   */
  HeigthStartZone?: number;

  /**
   * Hvor går snøgrensa i området?
   */
  SnowLine?: number;
  SnowLineName?: string;
  TerrainStartZoneName?: string;

  /**
   * Hva slags terrengtype var det i løsneområdet. The TerrainStartZoneKD unique identifier
   */
  TerrainStartZoneTID?: number;
}
