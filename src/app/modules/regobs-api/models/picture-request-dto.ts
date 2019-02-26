/* tslint:disable */
export interface PictureRequestDto {
  Photographer?: string;
  Copyright?: string;
  Aspect?: number;
  GeoHazardTID?: number;
  UsageFlagTID?: number;
  RegistrationTID?: number;
  PictureComment?: string;
  PictureImageBase64?: string;
  IsMainAttachment?: boolean;
}
