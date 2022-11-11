/* tslint:disable */
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

  /**
   * PST X distance (in meters)
   */
  PstX?: number;

  /**
   * PST Y distance (in meters)
   */
  PstY?: number;

  /**
   * Amount of block that released in Rutchblock test
   */
  RbRelease?: number;
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
