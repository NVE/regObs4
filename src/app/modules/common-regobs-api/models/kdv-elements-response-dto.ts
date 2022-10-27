/* tslint:disable */
import { KdvElement } from './kdv-element';
export interface KdvElementsResponseDto {
  KdvRepositories?: {[key: string]: Array<KdvElement>};
  ViewRepositories?: {};
}
