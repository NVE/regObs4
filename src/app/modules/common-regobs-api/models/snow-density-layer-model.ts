/* eslint-disable */
export interface SnowDensityLayerModel {
  Comment?: string;

  /**
   * Density in kg/m^3
   */
  Density?: number;
  Depth?: number;
  SortOrder?: number;

  /**
   * thickness in m
   */
  Thickness?: number;
  WaterEquivalent?: number;

  /**
   * Weight in KG
   */
  Weight?: number;
}
