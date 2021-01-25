import { WarningGroup } from './warning-group.model';

export interface IWarningGroupInMapView {
  center: WarningGroup[];
  viewBounds: WarningGroup[];
  buffer: WarningGroup[];
}
