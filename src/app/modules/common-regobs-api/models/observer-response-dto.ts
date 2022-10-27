/* tslint:disable */
import { ObserverGroupDto } from './observer-group-dto';
export interface ObserverResponseDto {
  Guid?: string;
  Nick?: string;
  ObserverGroup?: Array<ObserverGroupDto>;
}
