import { PropertyFilter } from 'src/app/modules/common-regobs-api';
import { SearchCriteria } from '../../models/search-criteria';

export const SLUSH_FLOW_ID = 30;
export const CRITERIA_SLUSH_FLOW: PropertyFilter = {
  Name: 'AvalancheObs.AvalancheTID',
  Operator: 0,
  Value: SLUSH_FLOW_ID.toString(),
};

/**
 * @returns true if slush flow filter is on
 */
export function isSlushFlow(criteria: SearchCriteria): boolean {
  return (
    criteria.PropertyFilters?.length === 1 &&
    criteria.PropertyFilters[0].Name === CRITERIA_SLUSH_FLOW.Name &&
    criteria.PropertyFilters[0].Operator === CRITERIA_SLUSH_FLOW.Operator &&
    criteria.PropertyFilters[0].Value === CRITERIA_SLUSH_FLOW.Value
  );
}
