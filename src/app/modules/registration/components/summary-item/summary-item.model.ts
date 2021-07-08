import { ExistingOrNewAttachment } from '@varsom-regobs-common/registration';

export interface ISummaryItem {
  id: string;
  href: string;
  queryParams?: any;
  title: string;
  subTitle?: string;
  hasData?: boolean;
  attachments?: ExistingOrNewAttachment[];
}
