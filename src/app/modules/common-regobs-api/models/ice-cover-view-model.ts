/* tslint:disable */
export interface IceCoverViewModel {
  IceCoverBeforeName?: string;
  IceCoverName?: string;
  IceCoverAfterName?: string;
  IceSkateabilityName?: string;
  IceCapacityName?: string;

  /**
   * Hvordan har vannet vært isdekt før den aktuelle observajonen? Feks var det isfritt? Feltet sier noe om hvordan utviklingen er. The IceCoverBeforeKD unique identifier
   */
  IceCoverBeforeTID?: number;

  /**
   * Hvordan er vannet dekket av is nå. The IceCoverKD unique identifier
   */
  IceCoverTID?: number;
  IceCoverAfterTID?: number;

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;

  /**
   * Skøytebarhet. IceSkateabilityKD unique identifier
   */
  IceSkateabilityTID?: number;

  /**
   * Bæreevne. IceCapacityKD unique identifier
   */
  IceCapacityTID?: number;
}
