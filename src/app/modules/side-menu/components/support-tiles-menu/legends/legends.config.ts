import { SteepnessLegendComponent } from './steepness-legend/steepness-legend.component';
import { FloodzonesLegendComponent } from './floodzones-legend/floodzones-legend.component';
import { ClayzonesLegendComponent } from './clayzones-legend/clayzones-legend.component';
import { WeakenediceLegendComponent } from './weakenedice-legend/weakenedice-legend.component';
import { SteepnessCommonLegendComponent } from './steepness-common-legend/steepness-common-legend.component';
import { NoLegendComponent } from './no-legend.component';

export const legendsConfig = {
  steepness: SteepnessLegendComponent,
  floodzoones: FloodzonesLegendComponent,
  clayzones: ClayzonesLegendComponent,
  weakenedice: WeakenediceLegendComponent,
  'steepness-greenland': SteepnessCommonLegendComponent,
  'outlets-greenland': NoLegendComponent,
};
