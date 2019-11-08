/* tslint:disable */
export interface PictureRequestDto {

  /**
   * Navn på fotograf.
   */
  Photographer?: string;

  /**
   * Rettigheter til bilde.
   */
  Copyright?: string;

  /**
   * Hvilken himmelretning peker bilde. Gis i grader slik gitt på kompass. 0 er nord og 90 er øst osv.
   */
  Aspect?: number;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Bruksflagg er ikke implementert enda. Hensikten er å kunne flagge en observasjon som godkjent, underkjent, overført historisk database mm. The UsageFlagKD unique identifier
   */
  UsageFlagTID?: number;

  /**
   * Hva er bildet av. Dette feltet relaterer bildet til en observasjonstype. Feks værobservasjon, faretegn, osv. The RegistrationKD unique identifier
   */
  RegistrationTID?: number;

  /**
   * Kommentarfelt for bildet. F.eks for å beskrive det.
   */
  PictureComment?: string;

  /**
   * Billed objektet.
   */
  PictureImageBase64?: string;

  /**
   * Om bildet skal vises først i registreringen, eller ikke
   */
  IsMainAttachment?: boolean;
}
