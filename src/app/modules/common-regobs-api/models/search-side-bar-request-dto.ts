/* tslint:disable */
export interface SearchSideBarRequestDto {

  /**
   * Snow = 10, dirt = 20, water = 60, ice = 70.
   * At least one geo hazard is required.
   */
  GeoHazards?: Array<0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999>;

  /**
   * NO = 1, EN = 2, DE = 3, SL = 4, SV = 5, IT = 6
   * Default = 2.
   */
  LangKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
