import { IRegistration } from '../../registration.models';
import { Summary } from '@varsom-regobs-common/regobs-api';
import { RegistrationTid } from '../../models/registration-tid.enum';
import { Observable } from 'rxjs';

export interface ISummaryProvider {
    readonly registrationTid: RegistrationTid;
    generateSummary(reg: IRegistration, registrationTid: RegistrationTid): Observable<Summary[]>;
}
