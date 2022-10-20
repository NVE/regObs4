/* tslint:disable */
export interface IceCoverViewModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;
  IceCapacityName?: string;

  /**
   * Bæreevne. IceCapacityKD unique identifier
   */
  IceCapacityTID?: number;
  IceCoverAfterName?: string;
  IceCoverAfterTID?: number;
  IceCoverBeforeName?: string;

  /**
   * Hvordan har vannet vært isdekt før den aktuelle observajonen? Feks var det isfritt? Feltet sier noe om hvordan utviklingen er. The IceCoverBeforeKD unique identifier
   */
  IceCoverBeforeTID?: number;
  IceCoverName?: string;

  /**
   * Hvordan er vannet dekket av is nå. The IceCoverKD unique identifier
   */
  IceCoverTID?: number;
  IceSkateabilityName?: string;

  /**
   * Skøytebarhet. IceSkateabilityKD unique identifier
   */
  IceSkateabilityTID?: number;
}
