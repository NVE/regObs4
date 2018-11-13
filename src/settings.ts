
export const settings = {
    observations: {
        maxObservationsToFetch: 5000,
        daysBack: {
            Avalanche: [0, 1, 2, 3, 7, 7 * 2],
            Ice: [0, 1, 2, 7, 7 * 4, 7 * 12],
            Flooding: [0, 1, 2, 3, 7, 7 * 2],
            LandSlide: [0, 1, 2, 3, 7, 7 * 2],
        },
        timeZone: 'Europe/Oslo'
    },
    services: {
        regObs: {
            apiUrl: {
                'PROD': 'https://tst-h-web03.nve.no/regobswebapi_v4.0',
                'DEMO': 'https://tst-h-web03.nve.no/regobswebapi_v4.0',
                'TEST': 'https://tst-h-web03.nve.no/regobswebapi_v4.0'
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
            apiJsonVersion: '4.0.0',
        },
        warning: {
            defaultWarningDaysAhead: 2,
            summerMonths: [5, 6, 7, 8, 9, 10],
            timezone: 'Europe/Oslo',
            Avalanche: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/avalanche/v4.0.2/api',
                webUrl: 'http://www.varsom.no/snoskredvarsling/varsel/{regionName}/'
            },
            LandSlide: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/landslide/v1.0.5/api',
                webUrl: 'http://www.varsom.no/flom-og-jordskredvarsling/',
            },
            Flooding: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/flood/v1.0.5/api',
                webUrl: 'http://www.varsom.no/flom-og-jordskredvarsling/',
            },
            Ice: {
                apiUrl: 'http://www.iskart.no/json/ice_forecast_regions.json',
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
            cacheSize: 10000,
            embeddedUrl: '/assets/map/{z}/tile_{x}_{y}.png',
            embeddedUrlMaxZoom: 5,
            maxZoom: 18,
            zoomInPosition: 15,
            zoomToShowBeforeNorwegianDetailsMap: 9,
            // tslint:disable-next-line:max-line-length
            nowegianDetailsMapUrl: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
            defaultMapUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
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
        mapSearchZoomToLevel: 15,
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
        maximumAge: 180000,
        currentPositionOptions: {
            enableHighAccuracy: true,
            timeout: 20 * 1000, // 20 sec
            maximumAge: 10 * 60 * 1000 // 10 minutes
        },
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
    images: {
        size: 1800,
        quality: 50,
    },
    errorEmailAddress: 'snoskredvarsling@nve.no'
};
