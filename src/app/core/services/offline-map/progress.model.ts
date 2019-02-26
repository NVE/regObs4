import { ProgressStep } from './progress-step.model';

export interface Progress {
    percentage: number;
    step?: ProgressStep;
    description?: string;
}
