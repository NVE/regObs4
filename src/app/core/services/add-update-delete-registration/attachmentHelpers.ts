/**
 * Contains helper functions needed when posting registration data to regobs api.
 */

import { Observable, distinctUntilChanged, combineLatest, map } from 'rxjs';
import { getAllAttachmentsFromEditModel } from 'src/app/modules/common-registration/registration.helpers';
import {
  AttachmentUploadEditModel,
  ExistingAttachmentType,
  ExistingOrNewAttachment,
  NewAttachmentType,
  WaterLevelMeasurementUploadModel,
} from 'src/app/modules/common-registration/registration.models';
import { AttachmentEditModel, RegistrationEditModel } from 'src/app/modules/common-regobs-api';
import { attachmentsComparator } from '../../helpers/attachment-comparator';
import { RegistrationDraft } from '../draft/draft-model';

/**
 * Add an attachment to a registration object / draft.
 *
 * If the attachment is a WaterLevelMeasurementAttachment or a DamageObsAttachment, the attachment are added to the
 * respective sub form, water level or damage obs.
 *
 * Otherwise, attachments are added to the root Attachments property.
 *
 * @param uploadedAttachment Attachment to add to the registration
 * @returns New registration draft with attachment info
 */
export function addAttachmentToRegistration(
  uploadedAttachment: AttachmentUploadEditModel,
  draft: RegistrationEditModel
): RegistrationEditModel {
  if (!uploadedAttachment.AttachmentUploadId) {
    throw new Error('Cant add attachment without AttachmentUploadId');
  }

  const attachment: AttachmentEditModel = {
    ...uploadedAttachment,
  };

  delete attachment['id'];
  delete attachment['ref'];
  delete attachment['type'];

  const draftCopy: RegistrationEditModel = { ...draft };

  if (uploadedAttachment.type === 'WaterLevelMeasurementAttachment') {
    addWaterLevelAttachment(attachment, draftCopy, uploadedAttachment.ref);
  } else if (uploadedAttachment.type === 'DamageObsAttachment') {
    addDamageObsAttachment(attachment, draftCopy, uploadedAttachment.ref);
  } else {
    if (draftCopy.Attachments == null) {
      draftCopy.Attachments = [attachment];
    } else {
      draftCopy.Attachments = [...draftCopy.Attachments, attachment];
    }
  }

  return draftCopy;
}

/**
 * Compares two versions of a draft and returns true if existing (remote) attachments has changed
 */
function existingAttachmentsHasNotChanged(
  previous: RegistrationDraft,
  current: RegistrationDraft,
  registrationTid: number
) {
  const preExistingAttachments = getAllAttachmentsFromEditModel(previous.registration, registrationTid);
  const curExistingAttachments = getAllAttachmentsFromEditModel(current.registration, registrationTid);

  // Check if existing attachments has changed
  const changed = attachmentsComparator(preExistingAttachments, curExistingAttachments, 'AttachmentId');
  return changed;
}

/**
 * @returns an observable array of both new attachments and already uploaded attachments for given draft uuid
 */
export function getNewAndExistingAttachmentsForDraft$(
  registrationTid: number,
  draft: Observable<RegistrationDraft>,
  attachments: Observable<AttachmentUploadEditModel[]>
): Observable<ExistingOrNewAttachment[]> {
  const draft$ = draft.pipe(
    distinctUntilChanged((prev, curr) => existingAttachmentsHasNotChanged(prev, curr, registrationTid))
  );
  const newAttachments$ = attachments.pipe(
    distinctUntilChanged((prev, curr) => attachmentsComparator(prev, curr, 'id'))
  );
  return combineLatest([draft$, newAttachments$]).pipe(
    map(([draft, newAttachments]) => {
      const existingAttachments = getAllAttachmentsFromEditModel(draft.registration, registrationTid);
      return [
        ...existingAttachments.map((attachment) => ({ type: 'existing' as ExistingAttachmentType, attachment })),
        ...newAttachments.map((attachment) => ({ type: 'new' as NewAttachmentType, attachment })),
      ];
    })
  );
}

function addDamageObsAttachment(attachment: AttachmentEditModel, draft: RegistrationEditModel, ref: string) {
  throw new Error('Not implemented');
}

function addWaterLevelAttachment(attachment: AttachmentEditModel, draft: RegistrationEditModel, ref: string) {
  let found = false;

  const modifiedMeasurements = draft.WaterLevel2.WaterLevelMeasurement.map(
    (measurement: WaterLevelMeasurementUploadModel) => {
      // When we find a matching measurement, return a new object with updated attachment info
      if (measurement.ref === ref && ref != null) {
        found = true;
        const modifiedMeasurement = { ...measurement };
        if (modifiedMeasurement.Attachments == null) {
          modifiedMeasurement.Attachments = [attachment];
        } else {
          modifiedMeasurement.Attachments = [...modifiedMeasurement.Attachments, attachment];
        }
        return modifiedMeasurement;
      }

      return measurement;
    }
  );

  if (!found) {
    throw new Error(
      'Could not find water level measurement for attachment.' +
        `Ref: '${ref}', AttachmentId: '${attachment.AttachmentId}'`
    );
  }

  draft.WaterLevel2.WaterLevelMeasurement = modifiedMeasurements;
}
