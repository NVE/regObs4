/* tslint:disable */
import { IceThicknessLayerEditModel } from './ice-thickness-layer-edit-model';
export interface IceThicknessEditModel {

  /**
   * Comment
   */
  Comment?: string;

  /**
   * Isen kan være presset under vannspeilet eller flyte oppå. Her registreres denne høyden etter borring. IPositive verdier angir at vannet står nedi hulet og og negative verdier angir overvann. Verdi i meter [m].
   */
  IceHeightAfter?: number;

  /**
   * Isen kan være presset under vannspeilet eller flyte oppå. Her registreres denne høyden før borring. IceHeightBefore = 0 betyr at isen er tørr og negative verdier angir overvann. Verdi i meter [m].
   */
  IceHeightBefore?: number;
  IceThicknessLayers?: Array<IceThicknessLayerEditModel>;

  /**
   * Total istykkelse. I tabellen IceThicknessLayer kan individuelle islag registreres. Summen av dem skal samsvare med IceThickenssSum. Verdi i meter [m].
   */
  IceThicknessSum?: number;

  /**
   * Mengden sørpe oppå isen. Verdi i meter [m].
   */
  SlushSnow?: number;

  /**
   * Mengden tørr snø oppå isen. Verdi i meter [m].
   */
  SnowDepth?: number;
}
