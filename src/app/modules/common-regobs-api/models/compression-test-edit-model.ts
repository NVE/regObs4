/* tslint:disable */
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
   * PST X distance (in meters)
   */
  PstX?: number;

  /**
   * PST Y distance (in meters)
   */
  PstY?: number;

  /**
   * Percentage of block that released in Rutchblock test
   */
  RbRelease?: number;

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
