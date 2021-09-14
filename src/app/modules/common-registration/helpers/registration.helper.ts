import { RegistrationTid } from '../models/registration-tid.enum';
import { IRegistration } from '../models/registration.interface';
import { isEmpty, GeoHazard } from '@varsom-regobs-common/core';
import { ValidRegistrationType } from '../models/valid-registration.type';
import { AttachmentEditModel, AttachmentViewModel, RegistrationEditModel, RegistrationViewModel } from '@varsom-regobs-common/regobs-api';
import { SyncStatus } from '../registration.models';

export function getAllAttachments(reg: IRegistration, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  if(!reg) {
    return [];
  }
  if(reg.syncStatus === SyncStatus.InSync && reg.response) {
    return getAllAttachmentsFromResponse(reg, registrationTid);
  }
  return getAllAttachmentsFromRequest(reg, registrationTid);
}

export function getAttachmentsFromRegistrationViewModel(viewModel: RegistrationEditModel | RegistrationViewModel, registrationTid?: RegistrationTid): AttachmentEditModel[] {
  if(!viewModel || !viewModel.Attachments) {
    return [];
  }
  return (viewModel.Attachments as AttachmentViewModel[])
    .filter((a) => ((registrationTid > 0) ? a.RegistrationTID === registrationTid : true))
    .map((a) => ({ ...a, type: 'Attachment'  }));
}

export function getDamageObsAttachments(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  if(!viewModel || !viewModel.DamageObs) {
    return [];
  }
  return [].concat(...viewModel.DamageObs.map((item) => item.Attachments || []))
    .filter((a) => ((registrationTid > 0) ? a.RegistrationTID === registrationTid : true));
}

export function getWaterLevelAttachments(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  if(!viewModel || !viewModel.WaterLevel2 || !viewModel.WaterLevel2.WaterLevelMeasurement) {
    return [];
  }
  return [].concat(...viewModel.WaterLevel2.WaterLevelMeasurement.map((item) => item.Attachments || []))
    .filter((a) => ((registrationTid > 0) ? a.RegistrationTID === registrationTid : true));
}

export function getAllAttachmentsFromViewModel(viewModel: RegistrationEditModel, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  const attachments = getAttachmentsFromRegistrationViewModel(viewModel, registrationTid);
  const damageObsAttachments = getDamageObsAttachments(viewModel, registrationTid);
  const waterLevelAttachmetns = getWaterLevelAttachments(viewModel, registrationTid);
  return  [].concat(...attachments, ...damageObsAttachments, ...waterLevelAttachmetns);
}

export function getAllAttachmentsFromRequest(reg: IRegistration, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  return  getAllAttachmentsFromViewModel(reg.request, registrationTid);
}

export function getAllAttachmentsFromResponse(reg: IRegistration, registrationTid?: RegistrationTid):  AttachmentEditModel[] {
  return  getAllAttachmentsFromViewModel(reg.response, registrationTid);
}

export function deleteExistingAttachmentById(reg: IRegistration, attachmentId: number): void {
  if(reg && reg.request) {
    if(reg.request.Attachments && reg.request.Attachments.length > 0) {
      reg.request.Attachments = reg.request.Attachments.filter((a) => a.AttachmentId !== attachmentId);
    }
    if(reg.request.WaterLevel2 && reg.request.WaterLevel2.WaterLevelMeasurement) {
      for(const wlm of reg.request.WaterLevel2.WaterLevelMeasurement) {
        wlm.Attachments = wlm.Attachments.filter((a) => a.AttachmentId !== attachmentId);
      }
    }
  }
}

export function editExistingAttachmentById(reg: IRegistration, attachmentId: number, model: AttachmentEditModel): void {
  if(reg && reg.request) {
    if(reg.request.Attachments && reg.request.Attachments.length > 0) {
      reg.request.Attachments = (reg.request.Attachments || []).map((a) => {
        if(a.AttachmentId === attachmentId) {
          return Object.assign(a, model);
        }
        return a;
      });
    }
    if(reg.request.WaterLevel2 && reg.request.WaterLevel2.WaterLevelMeasurement) {
      for(const wlm of reg.request.WaterLevel2.WaterLevelMeasurement) {
        wlm.Attachments = (wlm.Attachments || []).map((a) => {
          if(a.AttachmentId === attachmentId) {
            return Object.assign(a, model);
          }
          return a;
        });
      }
    }
  }
}

export function getPropertyName(registrationTid: RegistrationTid): string {
  return RegistrationTid[registrationTid];
}

export function getRegistationPropertyForModel(regModel: RegistrationEditModel | RegistrationViewModel, registrationTid: RegistrationTid): ValidRegistrationType {
  if (regModel && registrationTid) {
    return regModel[getPropertyName(registrationTid)];
  }
  return null;
}

export function getRegistationProperty(reg: IRegistration, registrationTid: RegistrationTid): ValidRegistrationType {
  return getRegistationPropertyForModel(reg.request, registrationTid);
}

export function getRegistrationTids(): RegistrationTid[] {
  return Object.keys(RegistrationTid)
    .map((key) => RegistrationTid[key]).filter((val: RegistrationTid) => typeof (val) !== 'string');
}

export function isObservationModelEmptyForRegistrationTid(regModel: RegistrationEditModel | RegistrationViewModel, registrationTid: RegistrationTid): boolean {
  if (regModel && registrationTid) {
    return isEmpty(getRegistationPropertyForModel(regModel, registrationTid));
  }
  return true;
}

export function isObservationEmptyForRegistrationTid(reg: IRegistration, registrationTid: RegistrationTid): boolean {
  return isObservationModelEmptyForRegistrationTid(reg.request, registrationTid);
}

export function hasAnyObservations(reg: IRegistration): boolean {
  if (reg === undefined || reg === null) {
    return false;
  }
  const registrationTids = getRegistrationTids();
  return registrationTids.some((x) => !isObservationEmptyForRegistrationTid(reg, x));
}

export function isArrayType(tid: RegistrationTid): boolean {
  return [
    RegistrationTid.AvalancheActivityObs,
    RegistrationTid.AvalancheActivityObs2,
    RegistrationTid.AvalancheDangerObs,
    RegistrationTid.AvalancheEvalProblem2,
    RegistrationTid.CompressionTest,
    RegistrationTid.DangerObs,
    RegistrationTid.Picture,
    RegistrationTid.DamageObs
  ].indexOf(tid) >= 0;
}

export function getRegistrationTidsForGeoHazard(geoHazard: GeoHazard): RegistrationTid[] {
  const commonTypes = [RegistrationTid.GeneralObservation];
  const geoHazardValidTypes = new Map<GeoHazard, RegistrationTid[]>([
    [GeoHazard.Snow, [
      RegistrationTid.DangerObs,
      RegistrationTid.AvalancheObs,
      RegistrationTid.AvalancheActivityObs2,
      RegistrationTid.WeatherObservation,
      RegistrationTid.SnowSurfaceObservation,
      RegistrationTid.CompressionTest,
      RegistrationTid.SnowProfile2,
      RegistrationTid.AvalancheEvalProblem2,
      RegistrationTid.AvalancheEvaluation3,
      RegistrationTid.Incident
    ]],
    [GeoHazard.Ice, [
      RegistrationTid.IceCoverObs,
      RegistrationTid.IceThickness,
      RegistrationTid.DangerObs,
      RegistrationTid.Incident
    ]],
    [GeoHazard.Water, [
      RegistrationTid.WaterLevel2,
      RegistrationTid.DamageObs
    ]],
    [GeoHazard.Soil, [
      RegistrationTid.DangerObs,
      RegistrationTid.LandSlideObs
    ]]
  ]);
  return geoHazardValidTypes.get(geoHazard).concat(commonTypes);
}

export function getOrCreateNewRegistrationForm(reg: IRegistration, tid: RegistrationTid): ValidRegistrationType {
  if (isObservationEmptyForRegistrationTid(reg, tid)) {
    return isArrayType(tid) ? [] : {};
  }
  return getRegistationProperty(reg, tid);
}

