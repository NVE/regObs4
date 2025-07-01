/* tslint:disable */
import { AdaptiveElement } from './adaptive-element';
import { RegObsGenericValue } from './reg-obs-generic-value';
export interface Summary {
  RegistrationName?: string;
  RegistrationTID?: number;
  Summaries?: Array<RegObsGenericValue>;
}
