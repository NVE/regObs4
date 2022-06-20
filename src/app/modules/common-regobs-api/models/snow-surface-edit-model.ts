/* eslint-disable */
export interface SnowSurfaceEditModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;

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

  /**
   * Skiføre
   */
  SkiConditionsTID?: number;

  /**
   * Total snødybde i cm. Vi ønsker et gjennomsnitt for området.
   */
  SnowDepth?: number;

  /**
   * Hvor mye har vinden transportert snøen? Valg fra nedtrekksmeny. The SnowDriftKD unique identifier
   */
  SnowDriftTID?: number;

  /**
   * Snøgrense (moh)
   */
  SnowLine?: number;

  /**
   * Snødekkehardhet
   */
  SnowSurfaceTID?: number;

  /**
   * Overflatefuktighet
   */
  SurfaceWaterContentTID?: number;
}
