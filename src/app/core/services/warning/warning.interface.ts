import { LangKey } from 'src/app/modules/common-core/models';

export interface IWarning {
  warningLevel: number;
  publishTime: Date;
  validFrom: Date;
  validTo: Date;
  mainText: string;
  language: LangKey;
  emergencyWarning?: string;
}
