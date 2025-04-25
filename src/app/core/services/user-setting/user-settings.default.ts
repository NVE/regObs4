import { UserSetting } from '../../models/user-settings.model';
import { GeoHazard, LangKey, AppMode } from 'src/app/modules/common-core/models';
import { TopoMap } from '../../models/topo-map.enum';
import { Capacitor } from '@capacitor/core';

export const DEFAULT_USER_SETTINGS: (langKey?: LangKey) => UserSetting = (langKey?: LangKey) => {
  const isNative = Capacitor.isNativePlatform();

  let isTestRegobsNo = false;
  try {
    const url = new URL(window.location.href);
    isTestRegobsNo = url.hostname === 'test.regobs.no';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('isTestRegobsNo check failed', error);
  }

  return {
    appMode: isTestRegobsNo ? AppMode.Test : AppMode.Prod,
    language: langKey || LangKey.nb,
    currentGeoHazard: [GeoHazard.Snow],
    observationDaysBack: [
      { geoHazard: GeoHazard.Snow, daysBack: 2 },
      { geoHazard: GeoHazard.Ice, daysBack: 7 },
      { geoHazard: GeoHazard.Soil, daysBack: 3 },
      { geoHazard: GeoHazard.Water, daysBack: 3 },
    ],
    completedStartWizard: !isNative,
    supportTiles: [],
    showMapCenterV2: isNative,
    showObservations: true,
    topoMap: TopoMap.default,
    // showGeoSelectInfo er om coach marks skal vises etter oppstart / start-wizard
    showGeoSelectInfo: isNative,
    completedSimpleObsOnboarding: false,
    useRetinaMap: false,
    featureToggeGpsDebug: false,
    featureToggleDeveloperMode: false,
    preferCompleteSnowObservations: false,
  };
};
