export interface IIceWarningApiResult {
    iceForecastValidFrom: string;
    iceForecastValidTo: string;
    forecastRegions: Array<IIceWarningRegion>;
}

export interface IIceWarningRegion {
    name: string;
    validFrom: string;
    validTo: string;
    iceTableDate: string;
    url: string;
    counties: Array<string>;
}
