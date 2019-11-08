/* tslint:disable */
export interface AvalancheObsDto {

  /**
   * Tid da skredet gikk. DtAvalancheTime
   */
  DtAvalancheTime: string;

  /**
   * Eksposisjon
   */
  Aspect?: number;

  /**
   * Høyde i løsneområde
   */
  HeightStartZone?: number;

  /**
   * Høyde i stoppområdet
   */
  HeightStopZone?: number;

  /**
   * Størrelse. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Skredutløser. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;

  /**
   * Skredtype. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;

  /**
   * Terrengtype i løsneområdet. The TerrainStartZoneKD unique identifier
   */
  TerrainStartZoneTID?: number;

  /**
   * UTMZoneStop
   */
  UTMZoneStop?: number;

  /**
   * UTMEastStop
   */
  UTMEastStop?: number;

  /**
   * UTMNorthStop
   */
  UTMNorthStop?: number;

  /**
   * UTMEastStart
   */
  UTMEastStart?: number;

  /**
   * SnowLine
   */
  SnowLine?: number;

  /**
   * ValidExposition
   */
  ValidExposition?: string;

  /**
   * Skredutløser. The AvalCauseTID unique identifier
   */
  AvalCauseTID?: number;

  /**
   * Bruddhøyde
   */
  FractureHeight?: number;

  /**
   * Bruddbredde
   */
  FractureWidth?: number;

  /**
   * Skredbanenavn
   */
  Trajectory?: string;

  /**
   * StartLat
   */
  StartLat?: number;

  /**
   * StartLong
   */
  StartLong?: number;

  /**
   * StopLat
   */
  StopLat?: number;

  /**
   * StopLong
   */
  StopLong?: number;

  /**
   * UsageFlagKDV
   */
  UsageFlagTID?: number;

  /**
   * Comment
   */
  Comment?: string;
  UTMNorthStart?: number;
}
