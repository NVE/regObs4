export enum LangKey {
  nb = 1,
  en = 2,
  de = 3,
  sl = 4,
  sv = 5,
  it = 6,
  nn = 7,
  fr = 8,
  da = 9,
}

export function getLangKeyString(langKey: LangKey): string {
  return LangKey[langKey];
}
