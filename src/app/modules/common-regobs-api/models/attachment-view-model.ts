/* eslint-disable */
export interface AttachmentViewModel {
  AttachmentId?: number;

  /**
   * GeoHazard name
   */
  GeoHazardName?: string;

  /**
   * Registration name
   */
  RegistrationName?: string;

  /**
   * Urls in different formats
   */
  UrlFormats?: {Raw?: string, Original?: string, Thumbnail?: string, Large?: string, Medium?: string};

  /**
   * Full original image url
   */
  Url?: string;

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
   * Hva er bildet av. Dette feltet relaterer bildet til en observasjonstype. Feks værobservasjon, faretegn, osv. The RegistrationKD unique identifier
   */
  RegistrationTID?: number;

  /**
   * Kommentarfelt for bildet. F.eks for å beskrive det.
   */
  Comment?: string;
  AttachmentMimeType?: string;

  /**
   * Om bildet skal vises først i registreringen, eller ikke
   */
  IsMainAttachment?: boolean;
}
