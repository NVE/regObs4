/* tslint:disable */
import { AvalancheEvalProblemViewModel } from './avalanche-eval-problem-view-model';
export interface AvalancheEvaluation2ViewModel {
  AvalancheDangerName?: string;
  ValidExposition?: string;
  Comment?: string;
  AvalancheEvaluation?: string;
  AvalancheDevelopment?: string;
  ExposedHeight1?: number;
  ExposedHeight2?: number;
  ExposedHeightComboTID?: number;
  ExposedHeightComboName?: string;
  ExposedClimateTID?: number;
  ExposedClimateName?: string;
  AvalancheDangerTID?: number;
  AvalancheEvalProblems?: Array<AvalancheEvalProblemViewModel>;
}
