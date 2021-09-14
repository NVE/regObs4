import { Summary } from '@varsom-regobs-common/regobs-api';
import { ExistingOrNewAttachment } from '../attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';

export interface SummaryWithAttachments  {
  registrationTid: RegistrationTid;
  name: string;
  summaries?: Summary[];
  attachments?: ExistingOrNewAttachment[];
  subTypes: SummaryWithAttachments[];
}