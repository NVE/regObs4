import { GeoHazard } from 'src/app/modules/common-core/models';
import { SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api';

const DEFAULTS: { [key in GeoHazard]?: SearchCriteriaRequestDto } = {
  [GeoHazard.Snow]: {
    OrderBy: 'DtChangeTime',
  },
};

function getDefaultValue<T extends keyof SearchCriteriaRequestDto>(
  geoHazard: GeoHazard,
  key: T
): SearchCriteriaRequestDto[T] {
  let value: SearchCriteriaRequestDto[T];
  switch (key) {
    case 'OrderBy':
      value = 'DtChangeTime';
      break;
    default:
      break;
  }
  return value;
}

export default {
  get: getDefaultValue,
};
