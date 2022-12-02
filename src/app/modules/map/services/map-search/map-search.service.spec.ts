import { LangKey } from 'src/app/modules/common-core/models';
import { MapSearchService } from './map-search.service';
import { Navn } from './norwegian-search-result.model';

const DRAMMEN_CITY: Navn = {
  skrivemåte: 'Drammen',
  skrivemåtestatus: 'godkjent og prioritert',
  navnestatus: 'hovednavn',
  språk: 'Norsk',
  navneobjekttype: 'By',
  stedsnummer: 609364,
  stedstatus: 'aktiv',
  representasjonspunkt: {
    øst: 10.20448,
    nord: 59.74389,
    koordsys: 4258,
  },
  fylker: [
    {
      fylkesnavn: 'Viken',
      fylkesnummer: '30',
    },
  ],
  kommuner: [
    {
      kommunenavn: 'Drammen',
      kommunenummer: '3005',
    },
  ],
};

const OSLO_COUNTY: Navn = {
  skrivemåte: 'Oslo fylke',
  skrivemåtestatus: 'godkjent og prioritert',
  navnestatus: 'hovednavn',
  språk: 'Norsk',
  navneobjekttype: 'Fylke',
  stedsnummer: 509924,
  stedstatus: 'aktiv',
  representasjonspunkt: {
    øst: 10.73353,
    nord: 59.91187,
    koordsys: 4258,
  },
  fylker: [
    {
      fylkesnavn: 'Oslo',
      fylkesnummer: '03',
    },
  ],
  kommuner: [
    {
      kommunenavn: 'Oslo',
      kommunenummer: '0301',
    },
  ],
};

const FOLLO_AREA: Navn = {
  skrivemåte: 'Follo',
  skrivemåtestatus: 'godkjent og prioritert',
  navnestatus: 'hovednavn',
  språk: 'Norsk',
  navneobjekttype: 'Landskapsområde',
  stedsnummer: 267868,
  stedstatus: 'aktiv',
  representasjonspunkt: {
    øst: 10.92339,
    nord: 59.70191,
    koordsys: 4258,
  },
  fylker: [
    {
      fylkesnavn: 'Viken',
      fylkesnummer: '30',
    },
  ],
  kommuner: [
    {
      kommunenummer: '3019',
      kommunenavn: 'Vestby',
    },
    {
      kommunenummer: '3020',
      kommunenavn: 'Nordre Follo',
    },
    {
      kommunenummer: '3022',
      kommunenavn: 'Frogn',
    },
    {
      kommunenummer: '3021',
      kommunenavn: 'Ås',
    },
    {
      kommunenummer: '3023',
      kommunenavn: 'Nesodden',
    },
    {
      kommunenummer: '3028',
      kommunenavn: 'Enebakk',
    },
  ],
};

describe('Service: LocationSearchService', () => {
  let locationSearchService: MapSearchService;

  beforeEach(() => {
    locationSearchService = new MapSearchService(null, null, null);
  });

  it('#formatLocationDescription should format description for Drammen nicely in nynorsk', () => {
    const drammenDescription = locationSearchService.formatLocationDescription(DRAMMEN_CITY, LangKey.nn);
    expect(drammenDescription).toEqual('By, Drammen (Viken)');
  });

  it('#formatLocationDescription should format description for Drammen nicely in english', () => {
    const drammenDescription = locationSearchService.formatLocationDescription(DRAMMEN_CITY, LangKey.en);
    expect(drammenDescription).toEqual('Drammen (Viken)');
  });

  it('#formatLocationDescription should format description for Oslo fylke nicely in bokmål', () => {
    const result = locationSearchService.formatLocationDescription(OSLO_COUNTY, LangKey.nb);
    expect(result).toEqual('Fylke');
  });

  it('#formatLocationDescription should format description for Oslo fylke nicely in english', () => {
    const result = locationSearchService.formatLocationDescription(OSLO_COUNTY, LangKey.en);
    expect(result).toEqual('');
  });

  it('#formatLocationDescription should format description for Follo area nicely in nynorsk', () => {
    const result = locationSearchService.formatLocationDescription(FOLLO_AREA, LangKey.nn);
    expect(result).toEqual('Landskapsområde, Viken');
  });

  it('#formatLocationDescription should format description for Follo area nicely in english', () => {
    const result = locationSearchService.formatLocationDescription(FOLLO_AREA, LangKey.en);
    expect(result).toEqual('Viken');
  });
});
