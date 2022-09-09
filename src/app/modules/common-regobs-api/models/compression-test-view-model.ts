/* eslint-disable */
export interface CompressionTestViewModel {

  /**
   * Comment
   */
  Comment?: string;
  ComprTestFractureName?: string;

  /**
   * The ComprTestFractureKD unique identifier
   */
  ComprTestFractureTID?: number;
  CompressionTestName?: string;

  /**
   * The CompressionTestKDV unique identifier
   */
  CompressionTestTID?: number;

  /**
   * FractureDepth
   */
  FractureDepth?: number;
  IncludeInSnowProfile?: boolean;
  PropagationName?: string;

  /**
   * The PropagationKD unique identifier
   */
  PropagationTID?: number;
  StabilityEvalName?: string;

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
