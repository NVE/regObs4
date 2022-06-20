/* eslint-disable */
export interface CompressionTestEditModel {

  /**
   * Comment
   */
  Comment?: string;

  /**
   * The ComprTestFractureKD unique identifier
   */
  ComprTestFractureTID?: number;

  /**
   * The CompressionTestKDV unique identifier
   */
  CompressionTestTID?: number;

  /**
   * FractureDepth
   */
  FractureDepth?: number;
  IncludeInSnowProfile?: boolean;

  /**
   * The PropagationKD unique identifier
   */
  PropagationTID?: number;

  /**
   * The StabilityEvalKD unique identifier
   */
  StabilityEvalTID?: number;

  /**
   * TapsFracture
   */
  TapsFracture?: number;

  /**
   * TapsFullPropagation
   */
  TapsFullPropagation?: number;
}
