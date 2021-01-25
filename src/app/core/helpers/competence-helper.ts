export function getStarCount(competenceLevel: string): number {
  if (!competenceLevel) {
    return 0;
  }
  return competenceLevel.split('').filter((s) => s === '*').length;
}
