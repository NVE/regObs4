/* tslint:disable */
export interface IceCoverObsDto {
  IceCoverAfterTID?: number;

  /**
   * Hvordan har vannet vært isdekt før den aktuelle observajonen? Feks var det isfritt? Feltet sier noe om hvordan utviklingen er. The IceCoverBeforeKD unique identifier
   */
  IceCoverBeforeTID?: number;

  /**
   * Hvordan er vannet dekket av is nå. The IceCoverKD unique identifier
   */
  IceCoverTID?: number;

  /**
   * Bæreevne. IceCapacityKD unique identifier
   */
  IceCapacityTID?: number;

  /**
   * Skøytebarhet. IceSkateabilityKD unique identifier
   */
  IceSkateabilityTID?: number;

  /**
   * Flagger en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
}
