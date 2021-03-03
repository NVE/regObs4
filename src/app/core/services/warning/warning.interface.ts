import { LangKey } from '@varsom-regobs-common/core';

export interface IWarning {
  warningLevel: number;
  publishTime: Date;
  validFrom: Date;
  validTo: Date;
  mainText: string;
  language: LangKey;
  emergencyWarning?: string;
}
