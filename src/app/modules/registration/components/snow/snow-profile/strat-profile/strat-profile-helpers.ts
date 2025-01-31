import { StratProfileLayerEditModel } from 'src/app/modules/common-regobs-api';

export function calculateTotalThickness(layers: StratProfileLayerEditModel[]): number {
  const sum = layers
    .filter((x) => x.Thickness !== undefined)
    .map((layer) => layer.Thickness || 0)
    .reduce((pv, cv) => pv + cv, 0);
  return sum;
}

export function hasAnyAdvancedOptions(layer?: StratProfileLayerEditModel) {
  if (layer == null) {
    return false;
  }

  return (
    (layer.HardnessBottomTID || 0) > 0 ||
    (layer.GrainSizeAvgMax || 0) > 0 ||
    (layer.GrainFormSecondaryTID || 0) > 0 ||
    (layer.CriticalLayerTID || 0) > 0 ||
    !!layer.Comment
  );
}
