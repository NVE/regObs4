import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewConfig } from './registration-view-config.model';
import { SummaryComponent } from './summary/summary.component';
import { getSummaryInputs } from './summary/get-summary-input';
import { isObservationModelEmptyForRegistrationTid } from 'src/app/modules/common-registration/registration.helpers';
import { AvalancheEvaluationViewComponent } from './registrations/avalanche-evaluation-view/avalanche-evaluation-view.component';
import { AbalancheProblemsViewComponent } from './registrations/avalanche-problem-view/avalanche-problems-view.component';
import { isEmpty } from 'src/app/modules/common-core/helpers';

/**
 * Konfig for hvilke komponenter som skal vises for skjemaer i en registrering.
 *
 * Konfigurasjonen er veldig eksplisitt satt opp.
 * Et alternativ hadde vært å feks falle tilbake på en Summary-baserte visning hvis
 * ikke det fantes en konfigurasjon for den registreringstypen.
 */
export const REGISTRATION_VIEW_CONFIG: Record<number, RegistrationViewConfig> = {
  [RegistrationTid.GeneralObservation]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.GeneralObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.GeneralObservation),
  },
  [RegistrationTid.Incident]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.Incident),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.Incident),
  },
  [RegistrationTid.DangerObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.DangerObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.DangerObs),
  },
  [RegistrationTid.DamageObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.DamageObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.DamageObs),
  },
  [RegistrationTid.WeatherObservation]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WeatherObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WeatherObservation),
  },
  [RegistrationTid.SnowSurfaceObservation]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowSurfaceObservation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowSurfaceObservation),
  },
  [RegistrationTid.SnowCoverObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowCoverObs),
  },
  [RegistrationTid.AvalancheDangerObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheDangerObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheDangerObs),
  },
  [RegistrationTid.CompressionTest]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.CompressionTest),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.CompressionTest),
  },
  [RegistrationTid.AvalancheObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheObs),
  },
  [RegistrationTid.AvalancheActivityObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheActivityObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheActivityObs),
  },
  [RegistrationTid.AvalancheEvaluation]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation),
  },
  [RegistrationTid.AvalancheEvaluation2]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheEvaluation2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheEvaluation2),
  },
  [RegistrationTid.AvalancheEvaluation3]: {
    component: AvalancheEvaluationViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvaluation3),
    getInputs: (reg) => ({ data: reg.AvalancheEvaluation3 }),
  },
  [RegistrationTid.AvalancheEvalProblem2]: {
    component: AbalancheProblemsViewComponent,
    isEmpty: (reg) => isEmpty(reg.AvalancheEvalProblem2),
    getInputs: (reg) => ({ data: reg.AvalancheEvalProblem2 }),
  },
  [RegistrationTid.AvalancheActivityObs2]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.AvalancheActivityObs2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.AvalancheActivityObs2),
  },
  [RegistrationTid.SnowProfile2]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.SnowProfile2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.SnowProfile2),
  },
  [RegistrationTid.IceThickness]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceThickness),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.IceThickness),
  },
  [RegistrationTid.IceCoverObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.IceCoverObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.IceCoverObs),
  },
  [RegistrationTid.WaterLevel]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel),
  },
  [RegistrationTid.WaterLevel2]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.WaterLevel2),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.WaterLevel2),
  },
  [RegistrationTid.LandSlideObs]: {
    component: SummaryComponent,
    isEmpty: (reg) => isObservationModelEmptyForRegistrationTid(reg, RegistrationTid.LandSlideObs),
    getInputs: (reg) => getSummaryInputs(reg, RegistrationTid.LandSlideObs),
  },
};
