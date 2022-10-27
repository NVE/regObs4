/* tslint:disable */
import { ForecastRegionSubRegionDto } from './forecast-region-sub-region-dto';
export interface ForecastRegionDto {
  Id?: number;
  IsRegionForGrouping?: boolean;
  SortOrder?: number;
  SubRegions?: Array<ForecastRegionSubRegionDto>;
  Text?: string;
}
