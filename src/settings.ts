/* eslint-disable max-len */

import { NORWAY_BOUNDS } from './app/core/helpers/leaflet/norway-bounds';
import { SVALBARD_BOUNDS } from './app/core/helpers/leaflet/svalbard-bounds';
import { MapLayerZIndex } from './app/core/models/maplayer-zindex.enum';
import { ISettings } from './settings.model';

export const settings: ISettings = {
  authConfig: {
    TEST: {
      client_id: '13270815-7def-4800-8fc9-178dd517f574',
      server_host: 'https://nveb2c01test.b2clogin.com/nveb2c01test.onmicrosoft.com/B2C_1A_sign_up_sign_in_nve/v2.0',
      redirect_url: 'regobs://callback',
      end_session_redirect_url: undefined,
      scopes: 'openid offline_access',
      pkce: true,
      getObserverUrl: 'https://test-api.regobs.no/v5/Account/GetObserver',
      myPageUrl: 'https://test-konto.nve.no/User',
      updateObserverUrl: 'https://test-api.regobs.no/v5/Account/UpdateObserver',
    },
    DEMO: {
      client_id: '7149f248-5e18-4feb-8a0c-e988dc021977',
      server_host:
        'https://nveb2c01staging.b2clogin.com/nveb2c01staging.onmicrosoft.com/B2C_1A_sign_up_sign_in_nve/v2.0',
      redirect_url: 'regobs://callback',
      end_session_redirect_url: undefined,
      scopes: 'openid offline_access',
      pkce: true,
      getObserverUrl: 'https://demo-api.regobs.no/v5/Account/GetObserver',
      myPageUrl: 'https://demo-konto.nve.no/User',
      updateObserverUrl: 'https://demo-api.regobs.no/v5/Account/UpdateObserver',
    },
    PROD: {
      client_id: 'a0b10e50-f942-4619-a9ab-cf5c900a98d5',
      server_host: 'https://nveb2c01prod.b2clogin.com/nveb2c01prod.onmicrosoft.com/B2C_1A_sign_up_sign_in_nve/v2.0',
      redirect_url: 'regobs://callback',
      end_session_redirect_url: undefined,
      scopes: 'openid offline_access',
      pkce: true,
      getObserverUrl: 'https://api.regobs.no/v5/Account/GetObserver',
      myPageUrl: 'https://konto.nve.no/User',
      updateObserverUrl: 'https://api.regobs.no/v5/Account/UpdateObserver',
    },
  },
  observations: {
    maxObservationsToFetch: 5000,
    daysBack: {
      Snow: [0, 1, 2, 3, 7, 7 * 2, 365],
      Ice: [0, 1, 2, 7, 7 * 4, 7 * 12],
      Water: [0, 1, 2, 3, 7, 7 * 2],
      Soil: [0, 1, 2, 3, 7, 7 * 2],
    },
    timeZone: 'Europe/Oslo',
  },
  services: {
    regObs: {
      apiUrl: {
        PROD: 'https://api.regobs.no/v5',
        DEMO: 'https://demo-api.regobs.no/v5',
        TEST: 'https://test-api.regobs.no/v5',
        // 'TEST': 'http://localhost:40001'
      },
      serviceUrl: {
        PROD: 'https://api.nve.no/hydrology/regobs/v3.5.0',
        DEMO: 'http://stg-h-web03.nve.no/RegObsServices',
        TEST: 'http://tst-h-web03.nve.no/regobsservices_test',
      },
      webUrl: {
        PROD: 'https://www.regobs.no',
        DEMO: 'https://demo.regobs.no',
        TEST: 'https://test.regobs.no',
      },
      createUserUrl: '/Account/Register?c=Home',
      passwordRecoveryUrl: '/Account/PasswordRecovery?c=Home',
      changePasswordUrl: '/Account/ChangePassword?email={email}&c=Home',
      viewProfileUrl: '/Account/MyPage',
      apiJsonVersion: '4.0.0',
    },
    warning: {
      defaultWarningDaysAhead: 2,
      summerMonths: [5, 6, 7, 8, 9, 10],
      timezone: 'Europe/Oslo',
      dateFormat: 'YYYY-MM-DD',
      Snow: {
        apiUrl: 'https://api01.nve.no/hydrology/forecast/avalanche/v4.0.2/api',
        webUrl: {
          nb: 'http://www.varsom.no/snoskredvarsling/varsel/{regionName}/{day}?utm_source=regobs&utm_medium=app&utm_campaign=avalanche',
          en: 'http://www.varsom.no/en/avalanche-bulletins/forecast/{regionName}/{day}?utm_source=regobs&utm_medium=app&utm_campaign=avalanche',
        },
        featureName: 'omradeID',
      },
      Soil: {
        apiUrl: 'https://api01.nve.no/hydrology/forecast/landslide/v1.0.6/api',
        webUrl: {
          nb: 'http://www.varsom.no/flom-og-jordskredvarsling/varsel/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=landslide',
          en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/forecast/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=landslide',
        },
        featureName: 'fylkesnummer',
      },
      Water: {
        apiUrl: 'https://api01.nve.no/hydrology/forecast/flood/v1.0.6/api',
        webUrl: {
          nb: 'http://www.varsom.no/flom-og-jordskredvarsling/varsel/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=flood',
          en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/forecast/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=flood',
        },
        featureName: 'fylkesnummer',
      },
      Ice: {
        apiUrl: 'https://www.iskart.no/json/ice_forecast_regions.json',
        featureName: 'fylkesnummer',
      },
    },
  },
  db: {
    simpleStorage: {
      dbName: 'regobsSimpleStorage',
      location: 'default',
    },
    nanoSql: {
      dbName: 'regobs',
    },
  },
  map: {
    tiles: {
      defaultZoom: 5,
      minZoom: 2,
      minZoomSupportMaps: 5,
      maxZoom: 18,
      zoomLevelObservationList: 12,
      edgeBufferTiles: 0,
      updateWhenIdle: false,

      topoMapLayers: {
        statensKartverk: {
          url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
          options: {
            zIndex: MapLayerZIndex.OnlineBackgroundLayer,
            bounds: [
              [57.98808405905049, 4.626617431640625],
              [71.15939141681443, 30.816650390624996],
            ],
          },
          supportsOffline: true,
        },
        npolarBasiskart: {
          url: 'https://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_3857/MapServer/tile/{z}/{y}/{x}?blankTile=false',
          options: {
            zIndex: MapLayerZIndex.OnlineBackgroundLayer,
            bounds: [
              [73.7357239, 7.4670978],
              [81.1569081, 36.0502348],
            ],
            maxNativeZoom: 13,
          },
          supportsOffline: true,
        },
        geoDataLandskap: {
          url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_WMAS_WGS84/GeocacheLandskap/MapServer/tile/{z}/{y}/{x}?blankTile=false',
          options: {
            zIndex: MapLayerZIndex.OnlineBackgroundLayer,
          },
        },
        openTopo: {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          options: {
            zIndex: MapLayerZIndex.OnlineBackgroundLayer,
            // subdomains: [] ?
          },
        },
        arcGisOnline: {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          options: {
            zIndex: MapLayerZIndex.OnlineBackgroundLayer,
          },
        },
      },

      topoMaps: {
        mixArcGisOnline: [
          {
            layer: 'arcGisOnline',
            options: {
              zIndex: MapLayerZIndex.OnlineMixedBackgroundLayer,
            },
            excludeBounds: [NORWAY_BOUNDS, SVALBARD_BOUNDS],
          },
          {
            layer: 'npolarBasiskart',
          },
          {
            layer: 'statensKartverk',
          },
        ],
        mixOpenTopo: [
          {
            layer: 'openTopo',
            options: {
              zIndex: MapLayerZIndex.OnlineMixedBackgroundLayer,
            },
            excludeBounds: [NORWAY_BOUNDS, SVALBARD_BOUNDS],
          },
          {
            layer: 'npolarBasiskart',
          },
          {
            layer: 'statensKartverk',
          },
        ],
        geoDataLandskap: [
          {
            layer: 'geoDataLandskap',
          },
        ],
      },

      supportTiles: [
        {
          name: 'steepness',
          description: 'STEEPNESS_MAP_DESCRIPTION',
          url: 'https://gis3.nve.no/arcgis/rest/services/wmts/Bratthet/MapServer/tile/{z}/{y}/{x}',
          enabled: false,
          checked: true,
          opacity: 0.5,
          geoHazardId: 10,
          availableOffline: false,
          subTile: {
            name: 'steepness-outlet',
            description: 'STEEPNESS_OUTLET_MAP_DESCRIPTION',
            url: 'https://gis3.nve.no/arcgis/rest/services/wmts/KastWMTS/MapServer/tile/{z}/{y}/{x}',
            enabled: true,
            checked: true,
            availableOffline: true,
            bounds: [
              [57.136239319177434, -0.17578125],
              [57.136239319177434, 36.03515625],
              [81.36128726057069, 36.03515625],
              [81.36128726057069, -0.17578125],
              [57.136239319177434, -0.17578125],
            ],
          },
          bounds: [
            [57.136239319177434, -0.17578125],
            [57.136239319177434, 36.03515625],
            [81.36128726057069, 36.03515625],
            [81.36128726057069, -0.17578125],
            [57.136239319177434, -0.17578125],
          ],
        },
        {
          name: 'steepness-greenland',
          description: 'STEEPNESS_GREENLAND_MAP_DESCRIPTION',
          url: 'https://gis3.nve.no/arcgis/rest/services/wmts/BratthetGronland/MapServer/tile/{z}/{y}/{x}',
          enabled: false,
          checked: false,
          opacity: 0.5,
          geoHazardId: 10,
          availableOffline: true,
          bounds: [
            [63.706357155206376, -55.30247736705827],
            [63.706357155206376, -48.83886886210894],
            [67.72977075500214, -48.83886886210894],
            [67.72977075500214, -55.30247736705827],
            [63.706357155206376, -55.30247736705827],
          ],
        },
        {
          name: 'outlets-greenland',
          description: 'OUTLETS_GREENLAND_MAP_DESCRIPTION',
          url: 'https://gis3.nve.no/arcgis/rest/services/wmts/UtlopGronland/MapServer/tile/{z}/{y}/{x}',
          enabled: false,
          checked: false,
          opacity: 0.5,
          geoHazardId: 10,
          availableOffline: true,
          bounds: [
            [63.706357155206376, -55.30247736705827],
            [63.706357155206376, -48.83886886210894],
            [67.72977075500214, -48.83886886210894],
            [67.72977075500214, -55.30247736705827],
            [63.706357155206376, -55.30247736705827],
          ],
        },
        {
          name: 'clayzones',
          description: 'CLAY_ZONES_MAP_DESCRIPTION',
          url: 'https://gis2.nve.no/arcgis/rest/services/wmts/Kvikkleire_Jordskred/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          checked: true,
          opacity: 0.5,
          geoHazardId: 20,
          availableOffline: false,
          bounds: [
            [57.136239319177434, -0.17578125],
            [57.136239319177434, 36.03515625],
            [81.36128726057069, 36.03515625],
            [81.36128726057069, -0.17578125],
            [57.136239319177434, -0.17578125],
          ],
        },
        {
          name: 'floodzoones',
          description: 'FLOOD_ZONES_MAP_DESCRIPTION',
          url: 'https://gis3.nve.no/arcgis/rest/services/wmts/Flomsoner1/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          checked: true,
          opacity: 0.5,
          geoHazardId: 60,
          availableOffline: false,
          bounds: [
            [57.136239319177434, -0.17578125],
            [57.136239319177434, 36.03515625],
            [81.36128726057069, 36.03515625],
            [81.36128726057069, -0.17578125],
            [57.136239319177434, -0.17578125],
          ],
        },
        {
          name: 'weakenedice',
          description: 'WEAKENED_ICE_MAP_DESCRIPTION',
          url: 'https://gis3.nve.no/arcgis/rest/services/wmts/SvekketIs/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          checked: true,
          opacity: 0.5,
          geoHazardId: 70,
          availableOffline: true,
          bounds: [
            [57.136239319177434, -0.17578125],
            [57.136239319177434, 36.03515625],
            [81.36128726057069, 36.03515625],
            [81.36128726057069, -0.17578125],
            [57.136239319177434, -0.17578125],
          ],
        },
      ],
    },
    search: {
      no: {
        url: 'https://ws.geonorge.no/stedsnavn/v1/navn',
        maxResults: 20,
        exactFirst: true,
        coordinateSystem: 4326,
        resultFields:
          'metadata.totaltAntallTreff,navn.skrivemåte,navn.navneobjekttype,navn.stedsnummer,navn.representasjonspunkt.øst,navn.representasjonspunkt.nord,navn.fylker.fylkesnavn,navn.kommuner.kommunenavn',
      },
      geonames: {
        url: 'https://secure.geonames.org',
        maxResults: 20,
        username: 'regobs',
      },
      searchHistorySize: 5,
    },
    mapSearchZoomToLevel: 13,
    unknownMapCenter: [59.911197, 10.741059],
    flyToOnGpsZoom: 13,
    maxClusterRadius: 60, // 30,
  },
  dateFormats: {
    angular: {
      date: 'dd.MM.yyyy',
      dateAndTime: 'dd.MM.yyyy HH:mm',
    },
    moment: {
      date: 'DD.MM.YYYY',
      dateAndTime: 'DD.MM.YYYY HH:mm',
    },
  },
  kdvElements: {
    daysBeforeUpdate: 1,
  },
  helpTexts: {
    daysBeforeUpdate: 1,
  },
  images: {
    size: 1800,
    quality: 50,
  },
  sentryDsn: 'https://2e07df8503a34dc9973eedd05e7a0f49@sentry.io/170000',
  errorEmailAddress: 'regobs@nve.no',
  foregroundUpdateIntervalMs: 2 * 60 * 1000, // 2 minutes
  backgroundFetchTimeout: 20 * 1000, // 20 seconds
  popupDisclamerRefreshTimeMs: 1000 * 60 * 60 * 24 * 30, // 30 days
  googleAnalytics: {
    trackerId: 'UA-32394009-4',
    anonymizeIp: true,
  },
  language: {
    fallbackLang: 'en',
    supportedLanguages: [
      { lang: 'nb', name: 'Norsk bokmål' },
      { lang: 'nn', name: 'Norsk nynorsk' },
      { lang: 'en', name: 'English' },
      { lang: 'sv', name: 'Svenska' },
      { lang: 'da', name: 'Dansk' },
      { lang: 'de', name: 'Deutsch' },
      { lang: 'sl', name: 'Slovenski' },
      { lang: 'fr', name: 'Français' },
    ],
  },
  legalUrl: {
    en: 'https://www.varsom.no/en/about/regobs/regobs-terms-of-service/',
    nb: 'https://varsom.no/om-varsom/regobs/regobs-brukervilkar/',
  },
};
