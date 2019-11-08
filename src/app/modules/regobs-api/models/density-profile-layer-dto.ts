/* tslint:disable */
export interface DensityProfileLayerDto {
  Depth?: number;

  /**
   * thickness in m
   */
  Thickness?: number;

  /**
   * Density in kg/m^3
   */
  Density?: number;

  /**
   * Weight in KG
   */
  Weight?: number;
  Comment?: string;
  SortOrder?: number;
}
