/**
 * Contains helper functions needed when posting registration data to regobs api.
 */

import {
  AttachmentUploadEditModel,
  WaterLevelMeasurementUploadModel,
} from 'src/app/modules/common-registration/registration.models';
import { AttachmentEditModel, RegistrationEditModel } from 'src/app/modules/common-regobs-api';
import { removeNullOrUndefined } from '../../helpers/remove-empty';

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

  const attachment: AttachmentEditModel = removeNullOrUndefined({
    Aspect: uploadedAttachment.Aspect,
    AttachmentId: uploadedAttachment.AttachmentId,
    AttachmentMimeType: uploadedAttachment.AttachmentMimeType,
    AttachmentUploadId: uploadedAttachment.AttachmentUploadId,
    Comment: uploadedAttachment.Comment,
    Copyright: uploadedAttachment.Copyright,
    GeoHazardTID: uploadedAttachment.GeoHazardTID,
    IsMainAttachment: uploadedAttachment.IsMainAttachment,
    Photographer: uploadedAttachment.Photographer,
    RegistrationTID: uploadedAttachment.RegistrationTID,
  });

  const draftCopy: RegistrationEditModel = { ...draft };

  if (uploadedAttachment.type === 'WaterLevelMeasurementAttachment' && uploadedAttachment.ref) {
    addWaterLevelAttachment(attachment, draftCopy, uploadedAttachment.ref);
  } else if (uploadedAttachment.type === 'DamageObsAttachment' && uploadedAttachment.ref) {
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

function addDamageObsAttachment(attachment: AttachmentEditModel, draft: RegistrationEditModel, ref: string) {
  throw new Error('Not implemented');
}

function addWaterLevelAttachment(attachment: AttachmentEditModel, draft: RegistrationEditModel, ref: string) {
  let found = false;

  const modifiedMeasurements = (draft.WaterLevel2?.WaterLevelMeasurement || []).map(
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

  if (draft.WaterLevel2 && modifiedMeasurements) {
    draft.WaterLevel2.WaterLevelMeasurement = modifiedMeasurements;
  }
}
