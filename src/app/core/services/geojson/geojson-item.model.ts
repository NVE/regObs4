/**
 * Metadata for et GeoJSON-objekt lagret i databasen.
 */
export interface GeoJSONItem {
  /** Unik ID for geojson-objektet */
  id: string;

  /** Navn på geojson-objektet */
  name: string;

  /** Sist oppdatert tidspunkt i ms */
  date: number;

  /** Om objektet skal vises i kartet */
  on?: boolean;
}
