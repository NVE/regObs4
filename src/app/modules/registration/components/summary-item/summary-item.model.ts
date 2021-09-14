import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';

export interface ISummaryItem {
  id: string;
  href: string;
  queryParams?: any;
  title: string;
  subTitle?: string;
  hasData?: boolean;
  attachments?: ExistingOrNewAttachment[];
}
