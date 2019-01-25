/* tslint:disable */
import { ForecastRegionSubRegionDto } from './forecast-region-sub-region-dto';
export interface ForecastRegionDto {
  Id?: number;
  Text?: string;
  SortOrder?: number;
  SubRegions?: Array<ForecastRegionSubRegionDto>;
  IsRegionForGrouping?: boolean;
}
