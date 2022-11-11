import { IncidentEditModel } from 'src/app/modules/common-regobs-api';


export class IncidentValidation {
  static onCasualtiesNumChange(incident: IncidentEditModel){
    if (
      (incident.InvolvedNum == undefined && incident.CasualtiesNum > 0)
       || (incident.CasualtiesNum > incident.InvolvedNum)){
      return false;
    } else {
      return true;
    }
  }
  static onDeadNumChange(incident: IncidentEditModel){
    if(
      (incident.InvolvedNum == undefined && incident.CasualtiesNum == undefined && incident.DeadNum > 0)
      || (incident.DeadNum > incident.CasualtiesNum)
      || (incident.DeadNum > incident.InvolvedNum)){
      return false;
    } else {
      return true;
    }
  }
}