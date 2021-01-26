export interface WorldSearchResultModel {
  totalResultsCount: number;
  geonames: Array<{
    adminCode1: string;
    lng: string;
    geonameId: number;
    name: string;
    fclName: string;
    toponymName: string;
    countryId: string;
    fcodeName: string;
    adminName1: string;
    lat: string;
    fcl: string;
    fcode: string;
    population: number;
    countryCode: string;
    countryName: string;
  }>;
}
