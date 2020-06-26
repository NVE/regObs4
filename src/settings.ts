export const settings = {
  observations: {
    maxObservationsToFetch: 5000,
    daysBack: {
      Snow: [0, 1, 2, 3, 7, 7 * 2],
      Ice: [0, 1, 2, 7, 7 * 4, 7 * 12],
      Water: [0, 1, 2, 3, 7, 7 * 2],
      Dirt: [0, 1, 2, 3, 7, 7 * 2],
    },
    timeZone: 'Europe/Oslo'
  },
  services: {
    regObs: {
      apiUrl: {
        'PROD': 'https://api.regobs.no/app_v4',
        'DEMO': 'https://demo-api.regobs.no/app_v4',
        'TEST': 'https://test-api.regobs.no/app_v4'
        // 'TEST': 'http://localhost:40001'
      },
      serviceUrl: {
        'PROD': 'https://api.nve.no/hydrology/regobs/v3.5.0',
        'DEMO': 'http://stg-h-web03.nve.no/RegObsServices',
        'TEST': 'http://tst-h-web03.nve.no/regobsservices_test'
      },
      webUrl: {
        'PROD': 'https://www.regobs.no',
        'DEMO': 'https://demo.regobs.no',
        'TEST': 'https://test.regobs.no'
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
          // tslint:disable-next-line:max-line-length
          nb: 'http://www.varsom.no/snoskredvarsling/varsel/{regionName}/{day}?utm_source=regobs&utm_medium=app&utm_campaign=avalanche',
          // tslint:disable-next-line:max-line-length
          en: 'http://www.varsom.no/en/avalanche-bulletins/forecast/{regionName}/{day}?utm_source=regobs&utm_medium=app&utm_campaign=avalanche',
        },
        featureName: 'omradeID',
      },
      Dirt: {
        apiUrl: 'https://api01.nve.no/hydrology/forecast/landslide/v1.0.6/api',
        webUrl: {
          // tslint:disable-next-line:max-line-length
          nb: 'http://www.varsom.no/flom-og-jordskredvarsling/varsel/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=landslide',
          // tslint:disable-next-line:max-line-length
          en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/forecast/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=landslide',
        },
        featureName: 'fylkesnummer',
      },
      Water: {
        apiUrl: 'https://api01.nve.no/hydrology/forecast/flood/v1.0.6/api',
        webUrl: {
          // tslint:disable-next-line:max-line-length
          nb: 'http://www.varsom.no/flom-og-jordskredvarsling/varsel/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=flood',
          // tslint:disable-next-line:max-line-length
          en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/forecast/{regionName}/?date={day}&utm_source=regobs&utm_medium=app&utm_campaign=flood',
        },
        featureName: 'fylkesnummer',
      },
      Ice: {
        apiUrl: 'https://www.iskart.no/json/ice_forecast_regions.json',
        featureName: 'fylkesnummer',
      }
    }
  },
  db: {
    simpleStorage: {
      dbName: 'regobsSimpleStorage',
      location: 'default'
    },
    nanoSql: {
      dbName: 'regobs',
    }
  },
  map: {
    tiles: {
      cacheFolder: 'tilescache',
      cacheSize: 5000,
      cacheSaveBufferThrottleTimeMs: 50,
      cacheSaveBufferIdleInterval: 2000,
      tileImageFormat: 'image/png',
      embeddedUrl: '/assets/map/{z}/tile_{x}_{y}.png',
      defaultZoom: 5,
      embeddedUrlMaxZoomWorld: 0,
      embeddedUrlMaxZoomNorway: 0,
      minZoom: 2,
      minZoomSupportMaps: 5,
      maxZoom: 18,
      zoomInPosition: 15,
      zoomLevelObservationList: 12,
      edgeBufferTiles: 0,
      detectRetina: false,
      updateWhenIdle: false,
      // tslint:disable-next-line:max-line-length
      statensKartverkMapUrl: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
      geoDataLandskapMapUrl: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_WMAS_WGS84/GeocacheLandskap/MapServer/tile/{z}/{y}/{x}?blankTile=false',
      openTopoMapUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      arcGisOnlineTopoMapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      supportTiles: [
        {
          name: 'steepness',
          description: 'STEEPNESS_MAP_DESCRIPTION',
          url: 'http://gis3.nve.no/arcgis/rest/services/wmts/Bratthet/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          opacity: 0.5,
          geoHazardId: 10,
          disableWhenEnabled: [
            'steepness-outlet'
          ],
        },
        {
          name: 'steepness-outlet',
          description: 'STEEPNESS_OUTLET_MAP_DESCRIPTION',
          url: 'http://gis3.nve.no/arcgis/rest/services/wmts/KastWMTS/MapServer/tile/{z}/{y}/{x}',
          enabled: false,
          opacity: 0.5,
          geoHazardId: 10,
          disableWhenEnabled: [
            'steepness'
          ]
        },
        {
          name: 'clayzones',
          description: 'CLAY_ZONES_MAP_DESCRIPTION',
          url: 'http://gis2.nve.no/arcgis/rest/services/wmts/Kvikkleire_Jordskred/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          opacity: 0.5,
          geoHazardId: 20
        },
        {
          name: 'floodzoones',
          description: 'FLOOD_ZONES_MAP_DESCRIPTION',
          url: 'http://gis3.nve.no/arcgis/rest/services/wmts/Flomsoner1/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          opacity: 0.5,
          geoHazardId: 60
        },
        {
          name: 'weakenedice',
          description: 'WEAKENED_ICE_MAP_DESCRIPTION',
          url: 'http://gis3.nve.no/arcgis/rest/services/wmts/SvekketIs/MapServer/tile/{z}/{y}/{x}',
          enabled: true,
          opacity: 0.5,
          geoHazardId: 70
        }
      ],
      supportTilesBounds: [
        [
          57.136239319177434,
          -0.17578125
        ],
        [
          57.136239319177434,
          36.03515625
        ],
        [
          81.36128726057069,
          36.03515625
        ],
        [
          81.36128726057069,
          -0.17578125
        ],
        [
          57.136239319177434,
          -0.17578125
        ]
      ],
    },
    search: {
      no: {
        url: 'https://ws.geonorge.no/SKWS3Index/ssr/sok',
        maxResults: 20,
        exactFirst: true,
      },
      geonames: {
        url: 'https://secure.geonames.org',
        maxResults: 20,
        username: 'regobs',
      },
      searchHistorySize: 5,
    },
    bounds: {
      svalbard: {
        bbox: [[80.493155, 3.157765], [80.309405, 21.685119], [76.337433, 18.003936], [76.465943, 4.879966]],
      },
    },
    mapSearchZoomToLevel: 14,
    unknownMapCenter: [59.911197, 10.741059],
    flyToOnGpsZoom: 14,
    maxClusterRadius: 60, // 30,
  },
  snowRegionsGeoJsonName: 'omradeNavn',
  cordovaNotAvailable: 'cordova_not_available',
  gps: {
    highAccuracyPositionOptions: {
      enableHighAccuracy: true,
      timeout: 20 * 1000, // 20 sec
      maximumAge: Infinity // Start with latest cached value
    }
  },
  offlineAssetsFolder: 'assets',
  dateFormats: {
    angular: {
      date: 'dd.MM.yyyy',
      dateAndTime: 'dd.MM.yyyy HH:mm',
    },
    moment: {
      date: 'DD.MM.YYYY',
      dateAndTime: 'DD.MM.YYYY HH:mm',
    }
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
      { lang: 'en', name: 'English' },
      { lang: 'sv', name: 'Svenska' },
      { lang: 'de', name: 'Deutsch' },
      { lang: 'sl', name: 'Slovenski' }
    ],
  }
};
