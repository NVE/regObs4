/* tslint:disable */

/**
 * Filter by property value
 */
export interface PropertyFilter {

  /**
   * Property name. Properties in sub schemas must be prefixed with schema name.
   * Example: AvalancheObs.AvalancheTID
   * Multiple instance schemas, like DangerSign, are not supported.
   * If you use unknown/unsupported properties, you will get an HTTP 400.
   */
  Name?: string;
  Operator?: 0;

  /**
   * Target property value
   */
  Value?: string;
}
