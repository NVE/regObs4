export function getStarCount(competenceLevel: string): number {
  if (!competenceLevel) {
    return 0;
  }
  return competenceLevel.split('').filter((s) => s === '*').length;
}

export function getStarCountFromNumber(competenceLevel: number): number {
  if (!competenceLevel) {
    return 0;
  } else if (competenceLevel < 200) {
    switch (competenceLevel) {
      default:
      case 0:
      case 100:
        return 0;
      case 110:
        return 1;
      case 115:
        return 2;
      case 120:
        return 3;
      case 130:
        return 4;
      case 150:
        return 5;
    }
  } else {
    const starsNum = competenceLevel.toString()[1];
    return +starsNum;
  }
}
