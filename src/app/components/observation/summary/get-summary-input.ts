import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewModel, Summary } from 'src/app/modules/common-regobs-api';

/** Plukker ut summaries for angitt skjematype */
export function getSummaries(registration: RegistrationViewModel, tid: RegistrationTid): Summary[] {
  return (registration.Summaries || []).filter((s) => s.RegistrationTID === tid);
}

/** Plukker ut summaries for angitt skjematype og putter dette i et objekt som er tilpasset SummaryComponent */
export function getSummaryInputs(registration: RegistrationViewModel, tid: RegistrationTid) {
  return {
    summaries: getSummaries(registration, tid),
  };
}

export function getSummaryHeader(registration: RegistrationViewModel, tid: RegistrationTid): string {
  const summary = getSummaries(registration, tid)[0];
  if (!summary?.RegistrationName) {
    throw new Error(`No Summary or RegistrationName for registrationtid ${tid} in registration`);
  }
  return summary.RegistrationName;
}
