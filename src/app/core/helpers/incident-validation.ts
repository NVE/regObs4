import { IncidentEditModel } from 'src/app/modules/common-regobs-api';


export class IncidentValidation {
  static onCasualtiesNumChange(incident: IncidentEditModel){
    if ((incident.CasualtiesNum > incident.InvolvedNum)){
      return false;
    } else {
      return true;
    }
  }
  static onDeadNumChange(incident: IncidentEditModel){
    if(
      (incident.DeadNum > incident.CasualtiesNum)
      || (incident.DeadNum > incident.InvolvedNum)){
      return false;
    } else {
      return true;
    }
  }
}