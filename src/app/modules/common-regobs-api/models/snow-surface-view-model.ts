/* tslint:disable */
export interface SnowSurfaceViewModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;

  /**
   * Obsolete - Only in View Model
   */
  FootPenetration?: number;

  /**
   * Grense lagdelt snø (moh)
   */
  HeightLimitLayeredSnow?: number;

  /**
   * Nysnødybde i cm. Vi ønsker et gjennomsnitt for området
   */
  NewSnowDepth24?: number;

  /**
   * Nysnøgrensa. Hvor faller nedbør som snø? Meter over havet.
   */
  NewSnowLine?: number;
  SkiConditionsName?: string;
  SkiConditionsTID?: number;

  /**
   * Total snødybde i cm. Vi ønsker et gjennomsnitt for området.
   */
  SnowDepth?: number;
  SnowDriftName?: string;

  /**
   * Hvor mye har vinden transportert snøen? Valg fra nedtrekksmeny. The SnowDriftKD unique identifier
   */
  SnowDriftTID?: number;

  /**
   * Snøgrense (moh)
   */
  SnowLine?: number;
  SnowSurfaceName?: string;

  /**
   * Snødekkehardhet
   */
  SnowSurfaceTID?: number;

  /**
   * Obsolete - Only in View Model
   */
  SnowWindDepth24?: number;
  SurfaceRougnessName?: string;

  /**
   * Obsolete - Only in View Model
   */
  SurfaceRougnessTID?: number;
  SurfaceWaterContentName?: string;

  /**
   * Overflatefuktighet
   */
  SurfaceWaterContentTID?: number;
}
