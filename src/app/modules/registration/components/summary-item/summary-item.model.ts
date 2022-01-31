import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';

export interface ISummaryItem {
  id: string;
  href: string;
  queryParams?: unknown;
  title: string;
  subTitle?: string;
  hasData?: boolean;
  attachments?: ExistingOrNewAttachment[];
}
