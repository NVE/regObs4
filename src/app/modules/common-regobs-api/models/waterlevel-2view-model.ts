/* tslint:disable */
import { WaterLevelMeasurementViewModel } from './water-level-measurement-view-model';
export interface Waterlevel2ViewModel {
  Comment?: string;
    /**
   * Flood polygon area, List(lon, lat)
   */
  Extent?: Array<Array<number>>;
  MarkingReferenceName?: string;
  MarkingReferenceTID?: number;
  MarkingTypeName?: string;
  MarkingTypeTID?: number;
  MeasurementReferenceName?: string;
  MeasurementReferenceTID?: number;
  MeasurementTypeName?: string;
  MeasurementTypeTID?: number;
  MeasuringToolDescription?: string;
  ObservationTimingName?: string;
  ObservationTimingTID?: number;
  WaterAstrayName?: string;
  WaterAstrayTID?: number;
  WaterLevelMeasurement?: Array<WaterLevelMeasurementViewModel>;
  WaterLevelMethodName?: string;
  WaterLevelMethodTID?: number;
  WaterLevelStateName?: string;
  WaterLevelStateTID?: number;
}
