import { IRegistration } from '../../registration.models';
import { Summary } from 'src/app/modules/common-regobs-api/models';
import { RegistrationTid } from '../../models/registration-tid.enum';
import { Observable } from 'rxjs';

export interface ISummaryProvider {
  readonly registrationTid: RegistrationTid;
  generateSummary(reg: IRegistration, registrationTid: RegistrationTid): Observable<Summary[]>;
}
