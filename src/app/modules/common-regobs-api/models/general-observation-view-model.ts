/* eslint-disable */
import { UrlViewModel } from './url-view-model';
export interface GeneralObservationViewModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst
   */
  Comment?: string;
  GeoHazardName?: string;

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
  Urls?: Array<UrlViewModel>;
}
