/* tslint:disable */
export interface NearByRegistrationRequestDto {
  Longitude?: number;
  GeoHazards?: Array<0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999>;
  FromDate?: string;
  ToDate?: string;
  Latitude?: number;
  LangKey?: 1 | 2;
  Radius?: number;
  ReturnCount?: number;
  Offset?: number;
  ObserverID?: number;
  SelectedRegistrationTypes?: Array<number>;
}
