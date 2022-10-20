/* tslint:disable */
import { AvalancheEvalProblemViewModel } from './avalanche-eval-problem-view-model';
export interface AvalancheEvaluation2ViewModel {
  AvalancheDangerName?: string;
  AvalancheDangerTID?: number;
  AvalancheDevelopment?: string;
  AvalancheEvalProblems?: Array<AvalancheEvalProblemViewModel>;
  AvalancheEvaluation?: string;
  Comment?: string;
  ExposedClimateName?: string;
  ExposedClimateTID?: number;
  ExposedHeight1?: number;
  ExposedHeight2?: number;
  ExposedHeightComboName?: string;
  ExposedHeightComboTID?: number;
  ValidExposition?: string;
}
