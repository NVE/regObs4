import { RegistrationTid } from '../models/registration-tid.enum';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { ValidRegistrationType } from '../models/valid-registration.type';
import { AdaptiveElement, AttachmentViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import {
  RegistrationDraft,
  RegistrationEditModelWithRemoteOrLocalAttachments,
  RemoteOrLocalAttachmentEditModel,
} from 'src/app/core/services/draft/draft-model';
import { SnowProfileData } from '../../adaptive-cards/adaptive-snow-profile';

// TODO: Sjekk hvilke av disse vi egentlig trenger

export function getAttachmentsFromRegistrationViewModel(
  viewModel: RegistrationEditModelWithRemoteOrLocalAttachments | RegistrationViewModel,
  registrationTid?: RegistrationTid
): RemoteOrLocalAttachmentEditModel[] {
  if (!viewModel || !viewModel.Attachments) {
    return [];
  }
  return (viewModel.Attachments as RemoteOrLocalAttachmentEditModel[])
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true))
    .map((a) => ({ ...a, type: 'Attachment' }));
}

export function getDamageObsAttachments(
  viewModel: RegistrationEditModelWithRemoteOrLocalAttachments,
  registrationTid?: RegistrationTid
): RemoteOrLocalAttachmentEditModel[] {
  if (!viewModel || !viewModel.DamageObs) {
    return [];
  }
  return []
    .concat(...viewModel.DamageObs.map((item) => item.Attachments || []))
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true));
}

export function getWaterLevelAttachments(
  viewModel: RegistrationEditModelWithRemoteOrLocalAttachments,
  registrationTid?: RegistrationTid
): RemoteOrLocalAttachmentEditModel[] {
  if (!viewModel || !viewModel.WaterLevel2 || !viewModel.WaterLevel2.WaterLevelMeasurement) {
    return [];
  }
  return []
    .concat(...viewModel.WaterLevel2.WaterLevelMeasurement.map((item) => item.Attachments || []))
    .filter((a) => (registrationTid > 0 ? a.RegistrationTID === registrationTid : true));
}

export function getSnowProfileAttachments(
  viewModel: RegistrationViewModel,
  registrationTid?: RegistrationTid
): AttachmentViewModel & { Href: string } {
  if (registrationTid && registrationTid != RegistrationTid.SnowProfile2) {
    return null;
  }
  const snowProfileSummary = viewModel.Summaries?.find((s) => s.RegistrationTID === RegistrationTid.SnowProfile2);
  const snowProfilePlot = snowProfileSummary?.AdaptiveElements.find(
    (e: AdaptiveElement) => e.type == 'SnowProfilePlot'
  ) as SnowProfileData;
  if (snowProfilePlot) {
    return {
      GeoHazardTID: viewModel?.GeoHazardTID,
      GeoHazardName: viewModel?.GeoHazardName,
      RegistrationTID: snowProfileSummary?.RegistrationTID,
      RegistrationName: snowProfileSummary?.RegistrationName,
      UrlFormats: {
        Original: snowProfilePlot?.svgUrl,
        Large: snowProfilePlot?.svgUrl,
        Medium: snowProfilePlot?.pngUrl,
      },
      Url: snowProfilePlot?.svgUrl,
      Comment: viewModel?.SnowProfile2?.Comment,
      Href: snowProfilePlot?.interactiveUrl,
    };
  }
}

export function getAllAttachmentsFromViewModel(
  viewModel: RegistrationViewModel,
  registrationTid?: RegistrationTid
): AttachmentViewModel[] {
  const snowProfile = getSnowProfileAttachments(viewModel, registrationTid);
  const attachments = getAllAttachmentsFromEditModel(viewModel, registrationTid);
  if (snowProfile) {
    attachments.unshift(snowProfile);
  }
  return attachments;
}

export function getAllAttachmentsFromEditModel(
  registration: RegistrationEditModelWithRemoteOrLocalAttachments,
  registrationTid?: RegistrationTid
): RemoteOrLocalAttachmentEditModel[] {
  const attachments = getAttachmentsFromRegistrationViewModel(registration, registrationTid);
  const damageObsAttachments = getDamageObsAttachments(registration, registrationTid);
  const waterLevelAttachmetns = getWaterLevelAttachments(registration, registrationTid);
  return [...attachments, ...damageObsAttachments, ...waterLevelAttachmetns];
}

type RegistrationName = keyof typeof RegistrationTid;

export function getRegistrationName(registrationTid: RegistrationTid): RegistrationName {
  return RegistrationTid[registrationTid] as RegistrationName;
}

export function getRegistationPropertyForModel(
  regModel: RegistrationEditModelWithRemoteOrLocalAttachments | RegistrationViewModel,
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
  regModel: RegistrationEditModelWithRemoteOrLocalAttachments | RegistrationViewModel,
  registrationTid: RegistrationTid
): boolean {
  if (regModel && registrationTid) {
    return isEmpty(getRegistationPropertyForModel(regModel, registrationTid));
  }
  return true;
}

/*
  If in AvalancheObs data model we want to exclude DtAvalancheTime from 'isEmpty' validation we need to pass that property
  in the function. In that case we set hasAnyDataBesidesPropertyToExclude(AvalancheObs, ['DtAvalancheTime'])
*/
export function hasAnyDataBesidesPropertyToExclude<T>(dataModel: T, propertyToExclude: string[]) {
  // have to remove the property to exclude from the object and then check values on the rest
  //
  if (dataModel) {
    const dataModelCopy = { ...dataModel };
    propertyToExclude.forEach((p) => delete dataModelCopy[p]);
    const isEmtpy = isEmpty(dataModelCopy);
    return !isEmtpy;
  }
}

export function getRegistrationsWithData(draft: RegistrationDraft): RegistrationTid[] {
  const registrationTids = getRegistrationTids();
  return registrationTids.filter((tid) => !isObservationModelEmptyForRegistrationTid(draft.registration, tid));
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
      RegistrationTid.DamageObs,
    ].indexOf(tid) >= 0
  );
}

/**
 * Create an empty registration for given draft, if it does not exists
 * @returns the draft with actual registration initialized
 */
export function createEmptyRegistration(draft: RegistrationDraft, registrationTid: RegistrationTid): RegistrationDraft {
  const propName = getRegistrationName(registrationTid);
  if (!draft.registration[propName]) {
    return {
      ...draft,
      registration: {
        ...draft.registration,
        [propName]: getDefaultValue(registrationTid),
      },
    };
  }
  return draft;
}

/**
 * Removes empty registrations from given draft
 * @param draft the draft to filter
 * @returns same draft but without empty registrations
 */
export function removeEmptyRegistrations(draft: RegistrationDraft): RegistrationDraft {
  const registration = Object.keys(draft.registration).reduce((registration, key) => {
    if (!isEmpty(draft.registration[key])) {
      registration[key] = draft.registration[key];
    }
    return registration;
  }, {} as RegistrationEditModelWithRemoteOrLocalAttachments);
  return {
    ...draft,
    registration,
  };
}

function getDefaultValue(registrationTid: RegistrationTid) {
  if (isArrayType(registrationTid)) {
    return [];
  } else {
    return {};
  }
}

export type HasRegId = Pick<RegistrationViewModel, 'RegId'>;

/**
 * Return a list with only unique registrations.
 *
 * Only uses RegID when comparing registrations.
 */
export function getUniqueRegistrations<T extends HasRegId>(regs: T[]): T[] {
  const regIds = new Set();
  return regs.filter((reg) => {
    if (regIds.has(reg.RegId)) {
      return false;
    }
    regIds.add(reg.RegId);
    return true;
  });
}
