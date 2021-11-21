/**
 * Norwegian name search result root node
 * More info: https://ws.geonorge.no/stedsnavn/v1/
 */
export interface ReturSkrivemate {
  metadata: Metadata;
  navn: Navn[];
}

/**
 * Norwegian name search result type metdadata
 */
export interface Metadata {
  utkoordsys: number;
  treffPerSide: number;
  side: number;
  totaltAntallTreff: number;
  viserFra: number;
  viserTil: number;
  sokeStreng: string;
}

/**
 * Norwegian name search result type for location name
 */
export interface Navn {
  skrivemåte: string;
  skrivemåtestatus: string;
  navnestatus: string;
  språk: string;
  navneobjekttype: string;
  stedsnummer: number;
  stedstatus: string;
  representasjonspunkt: Representasjonspunkt;
  fylker: Fylker[];
  kommuner: Kommuner[];
}

/**
 * Norwegian name search result type for location name
 */
export interface Representasjonspunkt {
  øst: number;
  nord: number;
  koordsys: number;
}

/**
 * Norwegian name search result type for location coordinates
 */
export interface Representasjonspunkt {
  øst: number;
  nord: number;
  koordsys: number;
}

/**
 * Norwegian name search result type for location county
 */
export interface Fylker {
  fylkesnavn: string;
  fylkesnummer: string;
}

/**
 * Norwegian name search result type for location municipality
 */
export interface Kommuner {
  kommunenummer: string;
  kommunenavn: string;
}
