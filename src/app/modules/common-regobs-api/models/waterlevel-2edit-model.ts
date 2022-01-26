/* tslint:disable */
import { WaterLevelMeasurementEditModel } from './water-level-measurement-edit-model';
export interface Waterlevel2EditModel {
  WaterAstrayTID?: number;
  ObservationTimingTID?: number;
  MeasurementReferenceTID?: number;
  MeasurementTypeTID?: number;
  WaterLevelMethodTID?: number;
  MarkingReferenceTID?: number;
  WaterLevelStateTID?: number;
  MarkingTypeTID?: number;
  MeasuringToolDescription?: string;
  WaterLevelMeasurement?: Array<WaterLevelMeasurementEditModel>;
  Comment?: string;
}
