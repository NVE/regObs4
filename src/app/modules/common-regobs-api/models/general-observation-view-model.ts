/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface GeneralObservationViewModel {
  GeoHazardName?: string;
  Urls?: Array<UrlViewModel>;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is).
   */
  GeoHazardTID?: number;

  /**
   * Selve registreringen.
   */
  ObsComment?: string;

  /**
   * Overskriften (hovedpoenget).
   */
  ObsHeader?: string;

  /**
   * Kommentarfelt for å skrive utfyllende tekst
   */
  Comment?: string;
}
