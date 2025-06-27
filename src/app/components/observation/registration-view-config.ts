import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewConfig } from './registration-view-config.model';
import { SummaryComponent } from './summary/summary.component';
import { getSummaries, getSummaryHeader, getSummaryInputs } from './summary/get-summary-input';
import { isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { AvalancheActivitesViewComponent } from './registrations/avalanche-activity-view/avalanche-activities-view.component';
import { AvalancheEvaluationViewComponent } from './registrations/avalanche-evaluation-view/avalanche-evaluation-view.component';
import { AbalancheProblemsViewComponent } from './registrations/avalanche-problem-view/avalanche-problems-view.component';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { IceThicknessViewComponent } from './registrations/ice-thickness-view/ice-thickness-view.component';
import { SnowProfileViewComponent } from './registrations/snow-profile/snow-profile-view.component';
/**
 * Konfig for hvilke komponenter som skal vises for skjemaer i en registrering.
 *
 * Konfigurasjonen er veldig eksplisitt satt opp.
 * Et alternativ hadde vært å feks falle tilbake på en Summary-baserte visning hvis
 * ikke det fantes en konfigurasjon for den registreringstypen.
 */
export const REGISTRATION_VIEW_CONFIG: RegistrationViewConfig[] = [
  {
    tid: RegistrationTid.DangerObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.DangerObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.DangerObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.DangerObs),
  },
  {
    tid: RegistrationTid.AvalancheDangerObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheDangerObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheDangerObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.AvalancheDangerObs),
  },
  {
    tid: RegistrationTid.AvalancheObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.AvalancheObs),
  },
  {
    tid: RegistrationTid.Incident,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.Incident),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.Incident),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.Incident),
  },
  {
    tid: RegistrationTid.DamageObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.DamageObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.DamageObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.DamageObs),
  },
  {
    tid: RegistrationTid.AvalancheActivityObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheActivityObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheActivityObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.AvalancheActivityObs),
  },
  {
    tid: RegistrationTid.AvalancheActivityObs2,
    component: AvalancheActivitesViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheActivityObs2),
    getInputs: (reg) => ({ data: reg.AvalancheActivityObs2 }),
    getHeader: () => 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE',
  },
  {
    tid: RegistrationTid.WeatherObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WeatherObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WeatherObservation),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.WeatherObservation),
  },
  {
    tid: RegistrationTid.SnowSurfaceObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowSurfaceObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowSurfaceObservation),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.SnowSurfaceObservation),
  },
  {
    tid: RegistrationTid.SnowCoverObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowCoverObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.SnowCoverObs),
  },
  {
    tid: RegistrationTid.CompressionTest,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.CompressionTest),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.CompressionTest),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.CompressionTest),
  },
  {
    tid: RegistrationTid.SnowProfile2,
    component: SnowProfileViewComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowProfile2),
    getInputs: (reg) => ({
      regId: reg.RegId,
      data: reg.SnowProfile2,
      summaries: getSummaries(reg, RegistrationTid.SnowProfile2),
    }),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.SnowProfile2),
  },
  {
    tid: RegistrationTid.AvalancheEvalProblem2,
    component: AbalancheProblemsViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvalProblem2),
    getInputs: (reg) => ({ data: reg.AvalancheEvalProblem2 }),
    getHeader: () => 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE',
  },
  {
    tid: RegistrationTid.AvalancheEvaluation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.AvalancheEvaluation),
  },
  {
    tid: RegistrationTid.AvalancheEvaluation2,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation2),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.AvalancheEvaluation2),
  },
  {
    tid: RegistrationTid.AvalancheEvaluation3,
    component: AvalancheEvaluationViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvaluation3),
    getInputs: (reg) => ({ data: reg.AvalancheEvaluation3 }),
    getHeader: () => 'REGISTRATION.SNOW.AVALANCHE_EVALUATION.TITLE',
  },
  {
    tid: RegistrationTid.IceCoverObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.IceCoverObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.IceCoverObs),
  },
  {
    tid: RegistrationTid.IceThickness,
    component: IceThicknessViewComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceThickness),
    getInputs: (reg) => ({
      regId: reg.RegId,
      data: reg.IceThickness,
      summaries: getSummaries(reg, RegistrationTid.IceThickness),
    }),
    getHeader: () => 'REGISTRATION.ICE.ICE_THICKNESS.TITLE',
  },
  {
    tid: RegistrationTid.WaterLevel,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.WaterLevel),
  },
  {
    tid: RegistrationTid.WaterLevel2,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel2),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.WaterLevel2),
  },
  {
    tid: RegistrationTid.LandSlideObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.LandSlideObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.LandSlideObs),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.LandSlideObs),
  },
  {
    tid: RegistrationTid.GeneralObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.GeneralObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.GeneralObservation),
    getHeader: (reg) => getSummaryHeader(reg, RegistrationTid.GeneralObservation),
  },
];
