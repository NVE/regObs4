/* tslint:disable */
import { AdaptiveElement } from './adaptive-element';
import { RegObsGenericValue } from './reg-obs-generic-value';
export interface Summary {
  RegistrationTID?: number;
  RegistrationName?: string;
  AdaptiveElements?: Array<AdaptiveElement>;
  Summaries?: Array<RegObsGenericValue>;
}
