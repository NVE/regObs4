/* eslint-disable */
export interface AvalancheObsEditModel {

  /**
   * Eksposisjon
   */
  Aspect?: number;

  /**
   * Skredutløser. The AvalCauseTID unique identifier
   */
  AvalCauseTID?: number;

  /**
   * Skredtype. The AvalancheKD unique identifier
   */
  AvalancheTID?: number;

  /**
   * Skredutløser. The AvalancheTriggerKD unique identifier
   */
  AvalancheTriggerTID?: number;

  /**
   * Comment
   */
  Comment?: string;

  /**
   * Størrelse. The DestructiveSizeKD unique identifier
   */
  DestructiveSizeTID?: number;

  /**
   * Tid da skredet gikk.
   */
  DtAvalancheTime: string;

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
   * SnowLine
   */
  SnowLine?: number;

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
