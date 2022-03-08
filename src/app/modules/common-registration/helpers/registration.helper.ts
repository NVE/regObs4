import { RegistrationTid } from '../models/registration-tid.enum';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { ValidRegistrationType } from '../models/valid-registration.type';
import {
  AttachmentEditModel,
  AttachmentViewModel,
  RegistrationEditModel,
  RegistrationViewModel
} from 'src/app/modules/common-regobs-api/models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

// TODO: Sjekk hvilke av disse vi egentlig trenger

export function getAttachmentsFromRegistrationViewModel(
  viewModel: RegistrationEditModel | RegistrationViewModel,
  registrationTid?: RegistrationTid
): AttachmentEditModel[] {
  if (!viewModel || !viewModel.Attachments) {
    return [];
  }
  return (viewModel.Attachments as AttachmentViewModel[])
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true))
    .map((a) => ({ ...a, type: 'Attachment' }));
}

export function getDamageObsAttachments(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid): AttachmentEditModel[] {
  if (!viewModel || !viewModel.DamageObs) {
    return [];
  }
  return []
    .concat(...viewModel.DamageObs.map((item) => item.Attachments || []))
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true));
}

export function getWaterLevelAttachments(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid): AttachmentEditModel[] {
  if (!viewModel || !viewModel.WaterLevel2 || !viewModel.WaterLevel2.WaterLevelMeasurement) {
    return [];
  }
  return []
    .concat(...viewModel.WaterLevel2.WaterLevelMeasurement.map((item) => item.Attachments || []))
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true));
}

export function getAllAttachmentsFromViewModel(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid): AttachmentEditModel[] {
  const attachments = getAttachmentsFromRegistrationViewModel(viewModel, registrationTid);
  const damageObsAttachments = getDamageObsAttachments(viewModel, registrationTid);
  const waterLevelAttachmetns = getWaterLevelAttachments(viewModel, registrationTid);
  return [].concat(...attachments, ...damageObsAttachments, ...waterLevelAttachmetns);
}

type RegistrationName = keyof typeof RegistrationTid;

export function getRegistrationName(registrationTid: RegistrationTid): RegistrationName {
  return RegistrationTid[registrationTid] as RegistrationName;
}

export function getRegistationPropertyForModel(
  regModel: RegistrationEditModel | RegistrationViewModel,
  registrationTid: RegistrationTid
): ValidRegistrationType {
  if (regModel && registrationTid) {
    return regModel[getRegistrationName(registrationTid)];
  }
  return null;
}

export function getRegistrationTids(): RegistrationTid[] {
  return Object.keys(RegistrationTid)
    .map((key) => RegistrationTid[key])
    .filter((val: RegistrationTid) => typeof val !== 'string');
}

export function isObservationModelEmptyForRegistrationTid(
  regModel: RegistrationEditModel | RegistrationViewModel,
  registrationTid: RegistrationTid
): boolean {
  if (regModel && registrationTid) {
    return isEmpty(getRegistationPropertyForModel(regModel, registrationTid));
  }
  return true;
}

export function hasAnyObservations(draft: RegistrationDraft): boolean {
  if (draft == null) {
    return false;
  }
  const registrationTids = getRegistrationTids();
  return registrationTids.some((tid) => !isObservationModelEmptyForRegistrationTid(draft.registration, tid));
}

export function isArrayType(tid: RegistrationTid): boolean {
  return (
    [
      RegistrationTid.AvalancheActivityObs,
      RegistrationTid.AvalancheActivityObs2,
      RegistrationTid.AvalancheDangerObs,
      RegistrationTid.AvalancheEvalProblem2,
      RegistrationTid.CompressionTest,
      RegistrationTid.DangerObs,
      RegistrationTid.Picture,
      RegistrationTid.DamageObs
    ].indexOf(tid) >= 0
  );
}

