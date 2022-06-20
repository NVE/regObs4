/* eslint-disable */
export interface IceCoverEditModel {

  /**
   * Kommentarfelt for å skrive utfyllende tekst om observasjonen.
   */
  Comment?: string;

  /**
   * Bæreevne. IceCapacityKD unique identifier
   */
  IceCapacityTID?: number;
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
   * Skøytebarhet. IceSkateabilityKD unique identifier
   */
  IceSkateabilityTID?: number;
}
