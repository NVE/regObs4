/* eslint-disable */
import { WaterLevelMeasurementEditModel } from './water-level-measurement-edit-model';
export interface Waterlevel2EditModel {
  Comment?: string;
  MarkingReferenceTID?: number;
  MarkingTypeTID?: number;
  MeasurementReferenceTID?: number;
  MeasurementTypeTID?: number;
  MeasuringToolDescription?: string;
  ObservationTimingTID?: number;
  WaterAstrayTID?: number;
  WaterLevelMeasurement?: Array<WaterLevelMeasurementEditModel>;
  WaterLevelMethodTID?: number;
  WaterLevelStateTID?: number;
}
