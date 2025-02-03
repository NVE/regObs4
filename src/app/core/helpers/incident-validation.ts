import { IncidentEditModel } from 'src/app/modules/common-regobs-api';

export class IncidentValidation {
  static isCasualtiesValid(incident: IncidentEditModel) {
    const { CasualtiesNum, InvolvedNum } = incident;

    if (CasualtiesNum == null) {
      return true;
    }

    return InvolvedNum == null ? true : CasualtiesNum <= InvolvedNum;
  }

  static isDeadValid(incident: IncidentEditModel) {
    const { DeadNum, CasualtiesNum, InvolvedNum } = incident;

    if (DeadNum == null) {
      return true;
    }

    const lessDeadThanCasualties = CasualtiesNum == null ? true : DeadNum <= CasualtiesNum;
    const lessDeadThanInvolved = InvolvedNum == null ? true : DeadNum <= InvolvedNum;
    return lessDeadThanCasualties && lessDeadThanInvolved;
  }
}
