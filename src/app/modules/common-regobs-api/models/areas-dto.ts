/* eslint-disable */
import { CountyDto } from './county-dto';
import { ForecastRegionDto } from './forecast-region-dto';
export interface AreasDto {
  Counties?: Array<CountyDto>;
  CountryDescription?: string;
  CountryId?: number;
  CountryName?: string;
  ForecastRegions?: {NotSpecified?: Array<ForecastRegionDto>, Avalanche?: Array<ForecastRegionDto>, EarthFlow?: Array<ForecastRegionDto>, LandSlide?: Array<ForecastRegionDto>, RockFall?: Array<ForecastRegionDto>, IceFall?: Array<ForecastRegionDto>, Flooding?: Array<ForecastRegionDto>, Ice?: Array<ForecastRegionDto>, EventOnGlacier?: Array<ForecastRegionDto>, Jøkulhaup?: Array<ForecastRegionDto>, Drought?: Array<ForecastRegionDto>, Unknown?: Array<ForecastRegionDto>};
  SortOrder?: number;
}
