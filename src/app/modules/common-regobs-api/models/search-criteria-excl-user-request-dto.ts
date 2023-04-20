/* tslint:disable */
import { WithinExtentCriteriaDto } from './within-extent-criteria-dto';
import { PropertyFilter } from './property-filter';
import { WithinRadiusCriteriaDto } from './within-radius-criteria-dto';
import { RegistrationTypeCriteriaDto } from './registration-type-criteria-dto';

/**
 * Use this to filter out registrations.
 */
export interface SearchCriteriaExclUserRequestDto {

  /**
   * Descending order is default. Set this to true to use ascending order.
   */
  AscendingOrder?: boolean;

  /**
   * Find registrations in given county.
   * Only relevant for Norway.
   * ØSTFOLD = 01, AKERSHUS = 02, OSLO = 03, HEDMARK = 04, OPPLAND = 05, BUSKERUD = 06, VESTFOLD = 07, TELEMARK = 08, AUST-AGDER = 09, VEST-AGDER = 10, ROGALAND = 11, HORDALAND = 12, SOGN OG FJORDANE = 14, MØRE OG ROMSDAL = 15, SØR-TRØNDELAG = 16, NORD-TRØNDELAG = 17, NORDLAND = 18, TROMS = 19, FINNMARK = 20, SVALBARD = 21, VIKEN = 30, INNLANDET = 34, VESTFOLD OG TELEMARK = 38, AGDER = 42, VESTLAND = 46, Trøndelag = 50, TROMS OG FINNMARK = 54
   */
  Counties?: Array<string>;
  Countries?: Array<number>;
  Extent?: WithinExtentCriteriaDto;

  /**
   * Find registrations saved or changed after given date and time (inclusive)
   */
  FromDtChangeTime?: string;

  /**
   * Find registrations with obervation time after given date and time (inclusive)
   */
  FromDtObsTime?: string;

  /**
   * Language of result
   * Norwegian = 1, English = 2, German = 3, Slovenian = 4, Swedish = 5, Italian = 6, Norwegian (nn) = 7.
   * Default = 1
   */
  LangKey?: number;
  LocationId?: number;

  /**
   * Max number of registrations to return. Default = 100
   */
  NumberOfRecords?: number;

  /**
   * Start index. If more registrations matches your filter than you get in one chunk, set Offset to the count of how many records you already fetched, to retrieve the next chunk
   */
  Offset?: number;

  /**
   * Field to order by. You may use these fields: DtObsTime, DtRegTime, DtChangeTime. Default is DtObsTime. A few other fields may also work
   */
  OrderBy?: string;

  /**
   * Find registrations with given property value.
   * [Obsolete("Experimental feature that may be changed or removed in later versions")]
   */
  PropertyFilters?: Array<PropertyFilter>;
  Radius?: WithinRadiusCriteriaDto;

  /**
   * Find a registration with a specific unique ID. You may also use GET /Registration/{regId}/{langKey}
   */
  RegId?: number;

  /**
   * Find registrations on given geo hazard ID's.
   * Snow = 10, dirt = 20, water = 60, ice = 70.
   */
  SelectedGeoHazards?: Array<number>;

  /**
   * Find registrations in given regions.
   * Use /Search/SearchCriteria to find the forecast region IDs that are used for different geo hazards.
   */
  SelectedRegions?: Array<number>;

  /**
   * Find registrations of given types.
   * Use /Search/SearchCriteria to find out which types are used for different geo hazards.
   */
  SelectedRegistrationTypes?: Array<RegistrationTypeCriteriaDto>;
  TextSearch?: string;
  TimeZone?: string;

  /**
   * Find registrations saved or changed before given date and time (inclusive)
   */
  ToDtChangeTime?: string;

  /**
   * Find registrations with obervation time before given date and time (inclusive)
   */
  ToDtObsTime?: string;
}
