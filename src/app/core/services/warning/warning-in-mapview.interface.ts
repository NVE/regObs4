import { WarningGroup } from './warning-group.model';

export interface IWarningInMapView {
  inMapView: { center: boolean; viewBounds: boolean };
  warningGroup: WarningGroup;
}
