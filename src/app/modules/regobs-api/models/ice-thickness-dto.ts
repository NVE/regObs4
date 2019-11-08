/* tslint:disable */
import { IceThicknessLayerDto } from './ice-thickness-layer-dto';
export interface IceThicknessDto {

  /**
   * Mengden tørr snø oppå isen. Verdi i meter [m].
   */
  SnowDepth?: number;

  /**
   * Mengden sørpe oppå isen. Verdi i meter [m].
   */
  SlushSnow?: number;

  /**
   * Total istykkelse. I tabellen IceThicknessLayer kan individuelle islag registreres. Summen av dem skal samsvare med IceThickenssSum. Verdi i meter [m].
   */
  IceThicknessSum?: number;

  /**
   * Isen kan være presset under vannspeilet eller flyte oppå. Her registreres denne høyden før borring. IceHeightBefore = 0 betyr at isen er tørr og negative verdier angir overvann. Verdi i meter [m].
   */
  IceHeightBefore?: number;

  /**
   * Isen kan være presset under vannspeilet eller flyte oppå. Her registreres denne høyden etter borring. IPositive verdier angir at vannet står nedi hulet og og negative verdier angir overvann. Verdi i meter [m].
   */
  IceHeightAfter?: number;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Comment
   */
  Comment?: string;

  /**
   * Provide description for IceThicknessLayer
   */
  IceThicknessLayer?: Array<IceThicknessLayerDto>;
}
