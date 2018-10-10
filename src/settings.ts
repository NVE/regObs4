
export const settings = {
    observations: {
        maxObservationsToFetch: 1000,
        daysBackToKeepBeforeCleanup: 30,
        timeZone: 'Europe/Oslo'
    },
    services: {
        regObs: {
            apiUrl: {
                'PROD': 'https://api.nve.no/hydrology/regobs/webapi_v3.2.0',
                'DEMO': 'https://api.nve.no/hydrology/demo/regobs/webapi_v3.2',
                'TEST': 'http://tst-h-web03.nve.no/regobswebapi'
            },
            serviceUrl: {
                'PROD': 'https://api.nve.no/hydrology/regobs/v3.1.0',
                'DEMO': 'http://stg-h-web03.nve.no/RegObsServices',
                'TEST': 'http://tst-h-web03.nve.no/regobsservices_test'
            },
            webUrl: {
                'PROD': 'https://www.regobs.no',
                'DEMO': 'http://demo.regobs.no',
                'TEST': 'http://test.regobs.no'
            },
            createUserUrl: '/Account/Register?c=Home',
            passwordRecoveryUrl: '/Account/PasswordRecovery?c=Home',
            apiJsonVersion: '3.2.0',
        },
        warning: {
            defaultWarningDaysAhead: 2,
            summerMonths: [5, 6, 7, 8, 9, 10],
            timezone: 'Europe/Oslo',
            Snow: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/avalanche/v4.0.0/api'
            },
            Dirt: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/landslide/v1.0.5/api'
            },
            Water: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/flood/v1.0.5/api'
            }
        }
    },
    db: {
        simpleStorage: {
            dbName: 'regobsSimpleStorage',
            location: 'default'
        },
        nanoSql: {
            dbName: 'nanoSql',
            tableName: 'registration'
        }
    },
    map: {
        tiles: {
            embeddedUrl: '/assets/map/{z}/tile_{x}_{y}.png',
            embeddedUrlMaxZoom: 5,
            defaultMapUrl: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
            fallbackMapUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            supportTiles: [
                {
                    name: 'steepness',
                    description: 'STEEPNESS_MAP_DESCRIPTION',
                    url: 'http://gis3.nve.no/arcgis/rest/services/wmts/Bratthet/MapServer/tile/{z}/{y}/{x}',
                    enabled: true,
                    opacity: 0.5,
                    geoHazardId: 10
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
            ]
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
        },
        elevation: {
            no: {
                // tslint:disable-next-line:max-line-length
                url: 'https://gis3.nve.no/arcgis/rest/services/ImageService/SK_DTM20_NSF/ImageServer/identify?geometry={0},{1}&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson'
            },
            svalbard: {
                // tslint:disable-next-line:max-line-length
                url: 'https://gis3.nve.no/arcgis/rest/services/ImageService/DTM25_Svalbard/ImageServer/identify?geometry={0},{1}&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson',
                bbox: [[80.493155, 3.157765], [80.309405, 21.685119], [76.337433, 18.003936], [76.465943, 4.879966]],
            },
            world: {
                url: 'https://secure.geonames.org',
            }
        },
        metersLimitForUpdateElevation: 500,
    },
    snowRegionsGeoJsonName: 'OMRAADENAV',
    events: {
        nanosqlConnected: 'nanoSql:connected',
        tabsChanged: 'tabs:changed',
        geoHazardChanged: 'geoHazard:changed',
        fullscreenChanged: 'fullscreen:changed',
        centerMapToUser: 'gps:centerMapToUser',
        supportTilesChanged: 'supportTiles:changed',
        mapSearchItemClicked: 'mapSearchItem:clicked',
        userSettingsChanged: 'userSettings:changed',
        geolocationUpdate: 'gps:locationUpdate'
    },
    cordovaNotAvailable: 'cordova_not_available',
    gps: {
        maximumAge: 180000
    }
};
