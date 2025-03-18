import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewConfig } from './registration-view-config.model';
import { SummaryComponent } from './summary/summary.component';
import { getSummaryInputs } from './summary/get-summary-input';
import { isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { AvalancheActivitesViewComponent } from './registrations/avalanche-activity-view/avalanche-activities-view.component';
import { AvalancheEvaluationViewComponent } from './registrations/avalanche-evaluation-view/avalanche-evaluation-view.component';
import { AbalancheProblemsViewComponent } from './registrations/avalanche-problem-view/avalanche-problems-view.component';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { IceThicknessViewComponent } from './registrations/ice-thickness-view/ice-thickness-view.component';
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
  },
  {
    tid: RegistrationTid.AvalancheDangerObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheDangerObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheDangerObs),
  },
  {
    tid: RegistrationTid.AvalancheObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheObs),
  },
  {
    tid: RegistrationTid.Incident,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.Incident),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.Incident),
  },
  {
    tid: RegistrationTid.DamageObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.DamageObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.DamageObs),
  },
  {
    tid: RegistrationTid.AvalancheActivityObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheActivityObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheActivityObs),
  },
  {
    tid: RegistrationTid.AvalancheActivityObs2,
    component: AvalancheActivitesViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheActivityObs2),
    getInputs: (reg) => ({ data: reg.AvalancheActivityObs2 }),
  },
  {
    tid: RegistrationTid.WeatherObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WeatherObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WeatherObservation),
  },
  {
    tid: RegistrationTid.SnowSurfaceObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowSurfaceObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowSurfaceObservation),
  },
  {
    tid: RegistrationTid.SnowCoverObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowCoverObs),
  },
  {
    tid: RegistrationTid.CompressionTest,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.CompressionTest),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.CompressionTest),
  },
  {
    tid: RegistrationTid.SnowProfile2,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowProfile2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowProfile2),
  },
  {
    tid: RegistrationTid.AvalancheEvalProblem2,
    component: AbalancheProblemsViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvalProblem2),
    getInputs: (reg) => ({ data: reg.AvalancheEvalProblem2 }),
  },
  {
    tid: RegistrationTid.AvalancheEvaluation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation),
  },
  {
    tid: RegistrationTid.AvalancheEvaluation2,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation2),
  },
  {
    tid: RegistrationTid.AvalancheEvaluation3,
    component: AvalancheEvaluationViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvaluation3),
    getInputs: (reg) => ({ data: reg.AvalancheEvaluation3 }),
  },
  {
    tid: RegistrationTid.IceCoverObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.IceCoverObs),
  },
  {
    tid: RegistrationTid.IceThickness,
    component: IceThicknessViewComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceThickness),
    getInputs: (reg) => ({
      regId: reg.RegId,
      data: reg.IceThickness,
      summaries: getSummaryInputs(reg, RegistrationTid.IceThickness),
    }),
  },
  {
    tid: RegistrationTid.WaterLevel,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel),
  },
  {
    tid: RegistrationTid.WaterLevel2,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel2),
  },
  {
    tid: RegistrationTid.LandSlideObs,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.LandSlideObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.LandSlideObs),
  },
  {
    tid: RegistrationTid.GeneralObservation,
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.GeneralObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.GeneralObservation),
  },
];
