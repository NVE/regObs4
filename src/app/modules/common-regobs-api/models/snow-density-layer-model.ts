/* tslint:disable */
export interface SnowDensityLayerModel {
  Depth?: number;

  /**
   * thickness in m
   */
  Thickness?: number;

  /**
   * Density in kg/m^3
   */
  Density?: number;
  Comment?: string;

  /**
   * Weight in KG
   */
  Weight?: number;
  WaterEquivalent?: number;
  SortOrder?: number;
}
