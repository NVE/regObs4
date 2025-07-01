/* tslint:disable */
import { StratProfileLayerViewModel } from './strat-profile-layer-view-model';
export interface StratProfileViewModel {
  Layers?: Array<StratProfileLayerViewModel>;
  TotalDepth?: number;

  /** URL til bilde av snøprofil-plott */
  PlotImageUrl?: string;
}
