/**
 * Funksjoner for å lage tekst-representasjoner av snøprofil-relaterte ting, feks kornstørrelse og tester.
 */
import { TranslateService } from '@ngx-translate/core';
import { CompressionTestEditModel, KdvElement, StratProfileLayerEditModel } from 'src/app/modules/common-regobs-api';
import { GrainForm, grainFormTidToSnowSymbolKey } from './grainforms';
import { Hardness } from './models';
import { KDVs } from './kdvs';
import { CompressionTestPropagation } from './propagation';

type CompressionTestFormatOpts = { includeDepth?: boolean; includeFracture?: boolean };

/**
 * Formatterer kornform til snøsymbol-nøkkel for SVG-font.
 * Håndterer primær + sekundær kornform, inkludert MFcr-spesialtilfelle.
 */
export function formatGrainFormSymbol(primaryTID: GrainForm, secondaryTID?: GrainForm | null): string {
  let value = grainFormTidToSnowSymbolKey(primaryTID);
  if (secondaryTID != null && secondaryTID !== primaryTID) {
    if (primaryTID === GrainForm.MFcr) {
      value += grainFormTidToSnowSymbolKey(secondaryTID);
    } else if (secondaryTID === GrainForm.MFcr) {
      value += '(' + grainFormTidToSnowSymbolKey(secondaryTID) + grainFormTidToSnowSymbolKey(GrainForm.MF) + ')';
    } else {
      value += '(' + grainFormTidToSnowSymbolKey(secondaryTID) + ')';
    }
  } else if (primaryTID === GrainForm.MFcr) {
    value += grainFormTidToSnowSymbolKey(GrainForm.MF);
  }
  return value;
}

/**
 * Formatterer kornstørrelse (meter → mm-streng), med valgfri maks-verdi for å vise intervall.
 */
export function formatGrainSizeMm(avg: number, avgMax?: number | null): string {
  let value = fmtNum(avg * 100, 1).toString();
  if (avgMax) {
    value += '-' + fmtNum(avgMax * 100, 1);
  }
  return value;
}

function fmtNum(value: number, decimals: number): number {
  return Number(value.toFixed(decimals));
}

/**
 * Formateringsfunksjoner for snøprofil-relaterte ting.
 *
 * Eksponerer formateringsfunksjoner uten at man trenger å angi kdver og translateService hver gang.
 */
export function createSnowProfileLayerFormatter(translate: TranslateService, kdvs: KDVs) {
  return {
    // Flere funksjoner kan eksponeres her om de trengs
    // thickness: (layer: StratProfileLayerEditModel) => formatThickness(layer, translate),
    tooltip: (layer: StratProfileLayerEditModel) => formatTooltip(layer, translate, kdvs),
    compressionTest: (
      test: CompressionTestEditModel,
      opts: CompressionTestFormatOpts = { includeDepth: true, includeFracture: true }
    ) => formatCompressionTest(test, kdvs, opts),
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
    const grainSize = formatGrainSizeMm(GrainSizeAvg, GrainSizeAvgMax);
    return translate.instant('SNOW_PROFILE.LABEL_GRAIN_SIZE', { value: grainSize });
  }
  return undefined;
}

function formatHardness({ HardnessTID, HardnessBottomTID }: StratProfileLayerEditModel, translate: TranslateService) {
  if (HardnessTID == null || HardnessTID == Hardness[' - ']) {
    return translate.instant('SNOW_PROFILE.LABEL_HARDNESS_MISSING');
  }
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

type CompressionTestFormatter = (
  test: CompressionTestEditModel,
  kdvs: KDVs,
  opts: { includeDepth?: boolean; includeFracture?: boolean }
) => string;

function getCompressionTestFormatter(test: CompressionTestEditModel): CompressionTestFormatter {
  switch (test.PropagationTID) {
    case CompressionTestPropagation['PST Arr']:
    case CompressionTestPropagation['PST End']:
    case CompressionTestPropagation['PST SF']:
      return formatCompressionTestPST;
    default:
      return formatCompressionTestDefault;
  }
}

function formatPstXY(value: number) {
  return (value * 100).toFixed(0);
}

function formatCompressionTestPST(
  test: CompressionTestEditModel,
  kdvs: KDVs,
  opts: { includeDepth?: boolean; includeFracture?: boolean }
) {
  const { PstX, PstY, PropagationTID, FractureDepth } = test;

  let result = 'PST';
  if (PstX && PstY) {
    result += ` ${formatPstXY(PstX)}/${formatPstXY(PstY)}`;
  }
  if (PropagationTID === CompressionTestPropagation['PST End']) {
    result += ' End';
  } else if (PropagationTID === CompressionTestPropagation['PST Arr']) {
    result += ' Arr';
  } else if (PropagationTID === CompressionTestPropagation['PST SF']) {
    result += ' SF';
  }
  if (opts.includeDepth && FractureDepth) {
    result += ' ' + formatFractureDepth(FractureDepth);
  }

  return result;
}

/**
 * Format fracture depth
 * Converts to cm and removes decimals
 */
function formatFractureDepth(value: number) {
  return (value * 100).toFixed(0);
}

export function formatCompressionTest(
  test: CompressionTestEditModel,
  kdvs: KDVs,
  opts: { includeDepth?: boolean; includeFracture?: boolean }
) {
  const format = getCompressionTestFormatter(test);
  return format(test, kdvs, opts);
}

function formatCompressionTestDefault(
  test: CompressionTestEditModel,
  kdvs: KDVs,
  opts: { includeDepth?: boolean; includeFracture?: boolean }
) {
  const parts = [];
  if (test.PropagationTID) {
    parts.push(kdvs.propagation.find((x) => x.Id === test.PropagationTID)?.Name);
  }

  if (test.TapsFracture) {
    parts.push(test.TapsFracture);
  }
  if (opts.includeFracture) {
    if (test.ComprTestFractureTID) {
      const name = kdvs.fracture.find((x) => x.Id === test.ComprTestFractureTID)?.Name;
      parts.push(`(${name})`);
    }
  }
  if (opts.includeDepth && test.FractureDepth && test.FractureDepth > 0) {
    parts.push(`@${formatFractureDepth(test.FractureDepth)}cm`);
  }
  return parts.join('');
}
