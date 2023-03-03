/* tslint:disable */
export interface AtAGlanceViewModel {

  /**
   * Count of all attachments
   */
  AttachmentsCount?: number;
  CompetenceLevelTID?: number;
  DtObsTime?: string;

  /**
   * this field is deprecated and wont be used inpcoming versions of the app
   */
  FirstAttachmentId?: number;

  /**
   * Returns first attachement url from the observation or null
   */
  FirstAttachmentUrl?: string;
  FormNames?: Array<string>;
  GeoHazardTID?: number;
  Latitude?: number;
  Longitude?: number;
  NickName?: string;
  RegId?: number;
  Title?: string;
  UtmEast?: number;
  UtmNorth?: number;
}
