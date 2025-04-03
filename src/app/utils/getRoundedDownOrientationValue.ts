import { settings } from 'src/settings';

export const getRoundedDownOrientationValue = (value: number | undefined): number | undefined => {
  if (value === undefined || value === null) return undefined;

  // Get the keys of the orientation object and sort them numerically
  const keys = Object.keys(settings.orientation)
    .map(Number)
    .sort((a, b) => a - b);

  // Find the largest key that is less than or equal to the given value
  let roundedDownKey: number | undefined = undefined;

  for (const key of keys) {
    if (key <= value) {
      roundedDownKey = key;
    } else {
      break; // Stop iterating once we pass the value
    }
  }

  return roundedDownKey;
};
