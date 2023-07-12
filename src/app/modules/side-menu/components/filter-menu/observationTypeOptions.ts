import { RegistrationTypeDto, RegistrationTypeSubTypeDto } from 'src/app/modules/common-regobs-api';

export interface ObservationTypeView {
  name: string;
  id: number;
  isChecked: boolean;
  parentId: number;
}

/*class where i push the RegistrationTypeCriteriaDto and turn them into ObservationTypeView */
export class ObservationTypeOptions {
  /* [81.13, {name: 'Danger Sign', parentId: 81, id: 13, isChecked: false}]  */
  optionsToReturnMap = new Map<number, ObservationTypeView>();
  selectedOptions = new Map<number, ObservationTypeView>();
  constructor(registrationTypesList: RegistrationTypeDto[]) {
    this.optionsToReturnMap = convertObservationTypesDtoToView(registrationTypesList);
  }

  get options() {
    return [...this.optionsToReturnMap.values()];
  }
}

//combine subtypes and types into one array
function convertObservationTypesDtoToView(registrationTypesByGeoHazard: RegistrationTypeDto[]) {
  let arrToReturn = new Map<number, ObservationTypeView>();
  registrationTypesByGeoHazard.map((type) => {
    const subtypestoReturn =
      type.SubTypes.length > 0 ? mapRegistrationSubtypes(type.SubTypes, type.Id) : mapRegistrationType(type);
    arrToReturn = new Map([...arrToReturn, ...subtypestoReturn]);
  });

  return arrToReturn;
}

function mapRegistrationSubtypes(
  subtypes: RegistrationTypeSubTypeDto[],
  parentId: number
): Map<number, ObservationTypeView> {
  const optionsToReturnMap = new Map<number, ObservationTypeView>();
  subtypes.forEach((st) => {
    optionsToReturnMap.set(+`${parentId}.${st.Id}`, { name: st.Name, parentId: parentId, id: st.Id, isChecked: false });
  });
  return optionsToReturnMap;
}

function mapRegistrationType(type: RegistrationTypeDto): Map<number, ObservationTypeView> {
  return new Map([[type.Id, { name: type.Name, parentId: type.Id, id: type.Id, isChecked: false }]]);
}
