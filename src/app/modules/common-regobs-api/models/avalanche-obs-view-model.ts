/* tslint:disable */
export interface AvalancheObsViewModel {

  /**
   * Eksposisjon
   */
  Aspect?: number;
  AvalCauseName?: string;

  /**
   * Skredutløser. The AvalCauseTID unique identifier
   */
  AvalCauseTID?: number;
  AvalancheName?: string;

  /**
   * Skredtype. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;
  AvalancheTriggerName?: string;

  /**
   * Skredutløser. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;

  /**
   * Comment
   */
  Comment?: string;
  DestructiveSizeName?: string;

  /**
   * Størrelse. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Tid da skredet gikk.
   */
  DtAvalancheTime: string;

  /**
   * Tidligste tidspunkt da skredet gikk.
   */
  DtEarliestAvalancheTime?: string;

  /**
   * Hull of avalanche polygon, List(lon, lat)
   */
  Extent?: Array<Array<number>>;

  /**
   * Bruddhøyde
   */
  FractureHeight?: number;

  /**
   * Bruddbredde
   */
  FractureWidth?: number;

  /**
   * Høyde i løsneområde
   */
  HeightStartZone?: number;

  /**
   * Høyde i stoppområdet
   */
  HeightStopZone?: number;

  /**
   * Ble skredet fjernutløst?
   */
  RemotelyTriggered?: boolean;

  /**
   * SnowLine
   */
  SnowLine?: number;

  /**
   * Hull of avalanche starting zone, List(lon, lat)
   */
  StartExtent?: Array<Array<number>>;

  /**
   * StartLat
   */
  StartLat?: number;

  /**
   * StartLong
   */
  StartLong?: number;

  /**
   * Hull of avalanche runout zone, List (lon, lat)
   */
  StopExtent?: Array<Array<number>>;

  /**
   * StopLat
   */
  StopLat?: number;

  /**
   * StopLong
   */
  StopLong?: number;
  TerrainStartZoneName?: string;

  /**
   * Terrengtype i løsneområdet. The TerrainStartZoneKD unique identifier
   */
  TerrainStartZoneTID?: number;

  /**
   * Skredbanenavn
   */
  Trajectory?: string;

  /**
   * ValidExposition
   */
  ValidExposition?: string;
}
