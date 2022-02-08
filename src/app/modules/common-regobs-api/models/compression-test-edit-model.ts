/* eslint-disable */
export interface CompressionTestEditModel {

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
   * The ComprTestFractureKD unique identifier
   */
  ComprTestFractureTID?: number;

  /**
   * Comment
   */
  Comment?: string;
  IncludeInSnowProfile?: boolean;
}
