import { TranslateService } from '@ngx-translate/core';
import { KdvElement, StratProfileLayerEditModel } from 'src/app/modules/common-regobs-api';
import { GrainForm } from './grainforms';
import { Hardness } from './models';

interface KDVs {
  wetness: KdvElement[];
}

export function createSnowProfileLayerFormatter(translate: TranslateService, kdvs: KDVs) {
  return {
    // thickness: (layer: StratProfileLayerEditModel) => formatThickness(layer, translate),
    tooltip: (layer: StratProfileLayerEditModel) => formatTooltip(layer, translate, kdvs),
  };
}

function formatThickness({ Thickness }: StratProfileLayerEditModel, translate: TranslateService) {
  const thicknessCm = Number(((Thickness || 0) * 100).toFixed(1));
  return translate.instant('SNOW_PROFILE.LABEL_THICKNESS', { value: thicknessCm });
}

function formatGrainform(
  { GrainFormPrimaryTID, GrainFormSecondaryTID }: StratProfileLayerEditModel,
  translate: TranslateService
) {
  if (GrainFormPrimaryTID) {
    if (GrainFormSecondaryTID) {
      return translate.instant('SNOW_PROFILE.LABEL_GRAIN_FORM_PRIMARY_AND_SECONDARY', {
        primary: GrainForm[GrainFormPrimaryTID],
        secondary: GrainForm[GrainFormSecondaryTID],
      });
    } else {
      return translate.instant('SNOW_PROFILE.LABEL_GRAIN_FORM_PRIMARY_ONLY', {
        primary: GrainForm[GrainFormPrimaryTID],
      });
    }
  }
  return undefined;
}

function formatGrainSize({ GrainSizeAvg, GrainSizeAvgMax }: StratProfileLayerEditModel, translate: TranslateService) {
  if (GrainSizeAvg) {
    let grainSize = Number((GrainSizeAvg * 100).toFixed(1)).toString();
    if (GrainSizeAvgMax) {
      grainSize = grainSize + '-' + Number((GrainSizeAvgMax * 100).toFixed(1));
    }
    return translate.instant('SNOW_PROFILE.LABEL_GRAIN_SIZE', { value: grainSize });
  }
  return undefined;
}

function formatHardness({ HardnessTID, HardnessBottomTID }: StratProfileLayerEditModel, translate: TranslateService) {
  if (HardnessTID) {
    let hardness = Hardness[HardnessTID];

    if (HardnessBottomTID) {
      hardness += `-${Hardness[HardnessBottomTID]}`;
    }
    return translate.instant('SNOW_PROFILE.LABEL_HARDNESS', { value: hardness });
  }
  return undefined;
}

function formatWetness({ WetnessTID }: StratProfileLayerEditModel, translate: TranslateService, kdvs: KdvElement[]) {
  if (WetnessTID) {
    const kdv = kdvs.find((x) => x.Id === WetnessTID);
    const name = kdv?.Name || WetnessTID.toString();
    return translate.instant('SNOW_PROFILE.LABEL_WETNESS', { value: name });
  }
  return undefined;
}

function formatComment({ Comment }: StratProfileLayerEditModel) {
  if (Comment) {
    return `"${Comment}"`;
  }
  return undefined;
}

function formatTooltip(layer: StratProfileLayerEditModel, translate: TranslateService, kdvs: KDVs) {
  const items = [];
  items.push(formatThickness(layer, translate));
  items.push(formatGrainform(layer, translate));
  items.push(formatGrainSize(layer, translate));
  items.push(formatHardness(layer, translate));
  items.push(formatWetness(layer, translate, kdvs.wetness));
  items.push(formatComment(layer));
  return items.filter((x) => x != null).join('\n');
}
