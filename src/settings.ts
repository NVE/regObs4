
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
            },
            serviceUrl: {
                'PROD': 'https://api.nve.no/hydrology/regobs/v3.5.0',
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
                    no: 'http://www.varsom.no/snoskredvarsling/varsel/{regionName}/',
                    en: 'http://www.varsom.no/en/avalanche-bulletins/forecast/{regionName}/',
                },
                featureName: 'OMRAADEID',
            },
            Dirt: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/landslide/v1.0.5/api',
                webUrl: {
                    no: 'http://www.varsom.no/flom-og-jordskredvarsling/?date=',
                    en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/?date=',
                },
                featureName: 'fylkesnummer',
            },
            Water: {
                apiUrl: 'https://api01.nve.no/hydrology/forecast/flood/v1.0.5/api',
                webUrl: {
                    no: 'http://www.varsom.no/flom-og-jordskredvarsling/?date=',
                    en: 'http://www.varsom.no/en/flood-and-landslide-warning-service/?date=',
                },
                featureName: 'fylkesnummer',
            },
            Ice: {
                apiUrl: 'http://www.iskart.no/json/ice_forecast_regions.json',
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
            dbName: 'regobsv2',
        }
    },
    map: {
        tiles: {
            cacheFolder: 'tilescache',
            cacheSize: 10000,
            embeddedUrl: '/assets/map/{z}/tile_{x}_{y}.png',
            // embeddedUrlMaxZoomWorld: 5,
            // embeddedUrlMaxZoomNorway: 9,
            embeddedUrlMaxZoomWorld: 0,
            embeddedUrlMaxZoomNorway: 0,
            minZoom: 3,
            maxZoom: 18,
            zoomInPosition: 15,
            zoomToShowBeforeNorwegianDetailsMap: 9,
            // tslint:disable-next-line:max-line-length
            statensKartverkMapUrl: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norgeskart_bakgrunn&zoom={z}&x={x}&y={y}',
            openTopoMapUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            arcGisOnlineTopoMapUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
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
            searchHistorySize: 5,
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
        steepness: {
            no: {
                // tslint:disable-next-line:max-line-length
                url: 'https://gis3.nve.no/map/rest/services/Bratthet/MapServer/identify?geometry={0},{1}&geometryType=esriGeometryPoint&inSR=32633&layers=visible:0,1&layerDefs=&time=&layerTimeOptions=&tolerance=20&mapExtent={2}&imageDisplay=927,878,96&returnGeometry=false&maxAllowableOffset=20&geometryPrecision=1&dynamicLayers=&returnZ=false&returnM=false&gdbVersion=&returnUnformattedValues=false&returnFieldName=false&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=pjson',
            }
        },
        metersLimitForUpdateElevation: 500,
        mapSearchZoomToLevel: 14,
        unknownMapCenter: [59.911197, 10.741059],
        flyToOnGpsZoom: 14,
        maxClusterRadius: 30,
    },
    snowRegionsGeoJsonName: 'OMRAADENAV',
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
    googleAnalytics: {
        trackerId: 'UA-32394009-4',
        anonymizeIp: true,
    }
};
