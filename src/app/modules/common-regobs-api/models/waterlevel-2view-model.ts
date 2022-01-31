/* tslint:disable */
import { WaterLevelMeasurementViewModel } from './water-level-measurement-view-model';
export interface Waterlevel2ViewModel {
  WaterLevelStateName?: string;
  WaterAstrayName?: string;
  ObservationTimingName?: string;
  MeasurementReferenceName?: string;
  MeasurementTypeName?: string;
  WaterLevelMethodName?: string;
  MarkingReferenceName?: string;
  MarkingTypeName?: string;
  WaterLevelMeasurement?: Array<WaterLevelMeasurementViewModel>;
  WaterAstrayTID?: number;
  ObservationTimingTID?: number;
  MeasurementReferenceTID?: number;
  MeasurementTypeTID?: number;
  WaterLevelMethodTID?: number;
  MarkingReferenceTID?: number;
  WaterLevelStateTID?: number;
  MarkingTypeTID?: number;
  MeasuringToolDescription?: string;
  Comment?: string;
}
