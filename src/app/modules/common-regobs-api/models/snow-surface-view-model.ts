/* tslint:disable */
export interface SnowSurfaceViewModel {

  /**
   * Obsolete - Only in View Model
   */
  SnowWindDepth24?: number;
  SurfaceWaterContentName?: string;
  SnowDriftName?: string;
  SnowSurfaceName?: string;

  /**
   * Obsolete - Only in View Model
   */
  SurfaceRougnessTID?: number;
  SurfaceRougnessName?: string;

  /**
   * Obsolete - Only in View Model
   */
  FootPenetration?: number;

  /**
   * Total snødybde i cm. Vi ønsker et gjennomsnitt for området.
   */
  SnowDepth?: number;

  /**
   * Nysnødybde i cm. Vi ønsker et gjennomsnitt for området
   */
  NewSnowDepth24?: number;

  /**
   * Nysnøgrensa. Hvor faller nedbør som snø? Meter over havet.
   */
  NewSnowLine?: number;

  /**
   * Overflatefuktighet
   */
  SurfaceWaterContentTID?: number;

  /**
   * Hvor mye har vinden transportert snøen? Valg fra nedtrekksmeny. The SnowDriftKD unique identifier
   */
  SnowDriftTID?: number;

  /**
   * Snødekkehardhet
   */
  SnowSurfaceTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;

  /**
   * Grense lagdelt snø (moh)
   */
  HeightLimitLayeredSnow?: number;

  /**
   * Snøgrense (moh)
   */
  SnowLine?: number;
}
