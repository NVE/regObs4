/* tslint:disable */
import { RegistrationTypeCriteriaDto } from './registration-type-criteria-dto';
import { WithinRadiusCriteriaDto } from './within-radius-criteria-dto';
import { WithinExtentCriteriaDto } from './within-extent-criteria-dto';

/**
 * Use this to filter out registrations.
 */
export interface SearchCriteriaRequestDto {

  /**
   * Find registrations made by the observer with given ID
   */
  ObserverId?: number;

  /**
   * Find registrations made by the observer with given GUID.
   * This attribute is  deprecated and will be removed in the future.
   */
  ObserverGuid?: string;

  /**
   * Find registrations made by the observers in a specific group
   */
  GroupId?: number;

  /**
   * Find registrations made by observers with specific competence level IDs
   * Use /Search/SearchCriteria to find out which competence levels are used for different geo hazards.
   */
  ObserverCompetence?: Array<number>;

  /**
   * Find registrations made by the observer with given nick name
   */
  ObserverNickName?: string;

  /**
   * Find a registration with a specific unique ID. You may also use GET /Registration/{regId}/{langKey}
   */
  RegId?: number;

  /**
   * Language of result
   * Norwegian = 1, English = 2, German = 3, Slovenian = 4, Swedish = 5, Italian = 6, Norwegian (nn) = 7.
   * Default = 1
   */
  LangKey?: number;
  LocationId?: number;

  /**
   * Find registrations with obervation time after given date and time (inclusive)
   */
  FromDtObsTime?: string;

  /**
   * Find registrations with obervation time before given date and time (inclusive)
   */
  ToDtObsTime?: string;

  /**
   * Find registrations saved or changed after given date and time (inclusive)
   */
  FromDtChangeTime?: string;

  /**
   * Find registrations saved or changed before given date and time (inclusive)
   */
  ToDtChangeTime?: string;

  /**
   * Max number of registrations to return. Default = 100
   */
  NumberOfRecords?: number;

  /**
   * Start index. If more registrations matches your filter than you get in one chunk, set Offset to the count of how many records you already fetched, to retrieve the next chunk
   */
  Offset?: number;
  TimeZone?: string;

  /**
   * Find registrations of given types.
   * Use /Search/SearchCriteria to find out which types are used for different geo hazards.
   */
  SelectedRegistrationTypes?: Array<RegistrationTypeCriteriaDto>;

  /**
   * Find registrations in given regions.
   * Use /Search/SearchCriteria to find the forecast region IDs that are used for different geo hazards.
   */
  SelectedRegions?: Array<number>;

  /**
   * Find registrations on given geo hazard ID's.
   * Snow = 10, dirt = 20, water = 60, ice = 70.
   */
  SelectedGeoHazards?: Array<number>;
  Countries?: Array<number>;

  /**
   * Find registrations in given county.
   * Only relevant for Norway.
   * ØSTFOLD = 01, AKERSHUS = 02, OSLO = 03, HEDMARK = 04, OPPLAND = 05, BUSKERUD = 06, VESTFOLD = 07, TELEMARK = 08, AUST-AGDER = 09, VEST-AGDER = 10, ROGALAND = 11, HORDALAND = 12, SOGN OG FJORDANE = 14, MØRE OG ROMSDAL = 15, SØR-TRØNDELAG = 16, NORD-TRØNDELAG = 17, NORDLAND = 18, TROMS = 19, FINNMARK = 20, SVALBARD = 21, VIKEN = 30, INNLANDET = 34, VESTFOLD OG TELEMARK = 38, AGDER = 42, VESTLAND = 46, Trøndelag = 50, TROMS OG FINNMARK = 54
   */
  Counties?: Array<string>;
  TextSearch?: string;
  Radius?: WithinRadiusCriteriaDto;
  Extent?: WithinExtentCriteriaDto;

  /**
   * Field to order by. You may use these fields: DtObsTime, DtRegTime, DtChangeTime. Default is DtObsTime. A few other fields may also work
   */
  OrderBy?: string;

  /**
   * Descending order is default. Set this to true to use ascending order.
   */
  AscendingOrder?: boolean;
}
