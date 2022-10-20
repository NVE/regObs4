/* tslint:disable */
export interface AttachmentEditModel {

  /**
   * Hvilken himmelretning peker bilde. Gis i grader slik gitt på kompass. 0 er nord og 90 er øst osv.
   */
  Aspect?: number;
  AttachmentId?: number;
  AttachmentMimeType?: string;

  /**
   * Last opp attachment på forhånd og sett AttachmentUploadId
   */
  AttachmentUploadId?: string;

  /**
   * Kommentarfelt for bildet. F.eks for å beskrive det.
   */
  Comment?: string;

  /**
   * Rettigheter til bilde.
   */
  Copyright?: string;

  /**
   * Sett naturfare. Tabellen brukes av alle naturfarer (snø, jord, vann, is). The GeoHazardKD unique identifier
   */
  GeoHazardTID?: number;

  /**
   * Om bildet skal vises først i registreringen, eller ikke
   */
  IsMainAttachment?: boolean;

  /**
   * Navn på fotograf.
   */
  Photographer?: string;

  /**
   * Hva er bildet av. Dette feltet relaterer bildet til en observasjonstype. Feks værobservasjon, faretegn, osv. The RegistrationKD unique identifier
   */
  RegistrationTID?: number;
}
