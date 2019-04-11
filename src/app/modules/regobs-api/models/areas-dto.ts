/* tslint:disable */
import { ForecastRegionDto } from './forecast-region-dto';
import { CountyDto } from './county-dto';
export interface AreasDto {
  CountryId?: number;
  CountryName?: string;
  CountryDescription?: string;
  SortOrder?: number;
  ForecastRegions?: {NotSpecified?: Array<ForecastRegionDto>, Avalanche?: Array<ForecastRegionDto>, EarthFlow?: Array<ForecastRegionDto>, LandSlide?: Array<ForecastRegionDto>, RockFall?: Array<ForecastRegionDto>, IceFall?: Array<ForecastRegionDto>, Flooding?: Array<ForecastRegionDto>, Ice?: Array<ForecastRegionDto>, EventOnGlacier?: Array<ForecastRegionDto>, Jøkulhaup?: Array<ForecastRegionDto>, Drought?: Array<ForecastRegionDto>, Unknown?: Array<ForecastRegionDto>};
  Counties?: Array<CountyDto>;
}
