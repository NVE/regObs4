import { IncidentEditModel } from 'src/app/modules/common-regobs-api';

export class IncidentValidation {
  static onCasualtiesNumChange(incident: IncidentEditModel) {
    if ((incident.CasualtiesNum || 0) > (incident.InvolvedNum || 0)) {
      return false;
    } else {
      return true;
    }
  }
  static onDeadNumChange(incident: IncidentEditModel) {
    if (
      (incident.DeadNum || 0) > (incident.CasualtiesNum || 0) ||
      (incident.DeadNum || 0) > (incident.InvolvedNum || 0)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
