/* tslint:disable */
import { ForecastRegionDto } from './forecast-region-dto';
export interface AreasDto {
  CountryId?: number;
  CountryName?: string;
  CountryDescription?: string;
  SortOrder?: number;
  ForecastRegions?: Array<ForecastRegionDto>;
}
