/* tslint:disable */
export interface SnowSurfaceEditModel {

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
