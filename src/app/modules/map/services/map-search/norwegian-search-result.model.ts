export interface NorwegianSearchResultModelStednavn {
    ssrId: string;
    navnetype: string;
    kommunenavn: string;
    fylkesnavn: string;
    stedsnavn: string;
    aust: string;
    nord: string;
    skrivemaatestatus: string;
    spraak: string,
    skrivemaatenavn: string;
    epsgKode: string;
}

export interface NorwegianSearchResultModel {
    sokStatus: { ok: string, melding: string };
    totaltAntallTreff: string;
    stedsnavn: NorwegianSearchResultModelStednavn | Array<NorwegianSearchResultModelStednavn>;
}
