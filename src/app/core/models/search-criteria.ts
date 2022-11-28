import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';
import { Immutable } from './immutable';

export type SearchCriteria = SearchCriteriaRequestDto | Immutable<SearchCriteriaRequestDto>;