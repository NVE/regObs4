/* tslint:disable */
import { UrlEditModel } from './url-edit-model';
export interface GeneralObservationEditModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst
   */
  Comment?: string;

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
  Urls?: Array<UrlEditModel>;
}
