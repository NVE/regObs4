import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

export function getSummaryInputs(registration: RegistrationViewModel, tid: RegistrationTid) {
  return {
    summaries: (registration.Summaries || []).filter((s) => s.RegistrationTID === tid),
  };
}
