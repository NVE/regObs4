import { Params } from '@angular/router';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { ExistingOrNewAttachment } from 'src/app/modules/common-registration/registration.models';

export interface ISummaryItem extends Pick<RegistrationDraft, 'uuid'> {
  href: string;
  queryParams?: Params;
  title: string;
  subTitle?: string;
  hasData?: boolean;
  attachments?: ExistingOrNewAttachment[];
}
