/* tslint:disable */
export interface CompressionTestDto {

  /**
   * The CompressionTestKDV unique identifier
   */
  CompressionTestTID?: number;

  /**
   * TapsFracture
   */
  TapsFracture?: number;

  /**
   * TapsFullPropagation
   */
  TapsFullPropagation?: number;

  /**
   * The PropagationKD unique identifier
   */
  PropagationTID?: number;

  /**
   * FractureDepth
   */
  FractureDepth?: number;

  /**
   * The StabilityEvalKD unique identifier
   */
  StabilityEvalTID?: number;

  /**
   * The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * The ComprTestFractureKD unique identifier
   */
  ComprTestFractureTID?: number;

  /**
   * Comment
   */
  Comment?: string;

  /**
   * Include in snow profile
   */
  IncludeInSnowProfile?: boolean;
}
