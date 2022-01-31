/* tslint:disable */
import { UrlEditModel } from './url-edit-model';
export interface GeneralObservationEditModel {

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
  Urls?: Array<UrlEditModel>;
}
