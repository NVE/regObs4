import { NumberHelper } from './number-helper';

export class HydrologyHelper {
  static isEmpty(obj: Object | Array<Object | Array<Object>>) {}

  static calculateDensity(
    weightInKg: number,
    heightInM: number,
    tareWeightInKg: number,
    cylinderDiameterInM: number
  ) {
    if (
      !NumberHelper.isNumeric(cylinderDiameterInM) ||
      cylinderDiameterInM <= 0
    ) {
      return 0;
    }
    const r = cylinderDiameterInM / 2.0;
    const totalWeight = (weightInKg || 0) - (tareWeightInKg || 0);
    if (totalWeight <= 0) {
      return 0;
    }
    const heightInMeter = heightInM || 0;
    if (heightInMeter <= 0) {
      return 0;
    }
    const volume = Math.PI * r * r * heightInMeter;
    return totalWeight / volume;
  }

  static calculateWaterEquivalent(density: number, heightInMeter: number) {
    if (
      NumberHelper.isNumeric(density) &&
      NumberHelper.isNumeric(heightInMeter) &&
      density > 0 &&
      heightInMeter > 0
    ) {
      return (density / 1000) * (heightInMeter * 1000);
    }
    return 0;
  }
}
