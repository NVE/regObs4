/* tslint:disable */
import { WaterLevelMeasurementDto } from './water-level-measurement-dto';
export interface WaterLevel2Dto {
  WaterLevelMethodTID?: number;
  MeasurementReferenceTID?: number;
  WaterAstrayTID?: number;
  ObservationTimingTID?: number;
  UsageFlagTID?: number;
  MeasurementTypeTID?: number;
  WaterLevelStateTID?: number;
  MarkingReferenceTID?: number;
  MarkingTypeTID?: number;
  WaterLevelMeasurement?: Array<WaterLevelMeasurementDto>;
  MeasuringToolDescription?: string;
  Comment?: string;
}
