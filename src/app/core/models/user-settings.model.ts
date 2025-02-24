import { GeoHazard, AppMode, LangKey } from 'src/app/modules/common-core/models';
import { TopoMap } from './topo-map.enum';
import { SupportTileStore } from './support-tile.model';

export interface InfoPopupSettings {
  infoAboutObservationsRecievedTimestamps?: { [name: string]: number };
  infoAboutSupportMapsRecievedTimestamps?: { [name: string]: number };
  infoAboutOfflineSupportMapsRecievedTimestamps?: { [name: string]: number };
}

export interface UserSetting extends InfoPopupSettings {
  appMode: AppMode;
  language: LangKey;
  currentGeoHazard: Array<GeoHazard>;
  observationDaysBack: Array<{ geoHazard: GeoHazard; daysBack: number }>;
  completedStartWizard: boolean;
  supportTiles: Array<SupportTileStore>;
  showMapCenter: boolean;
  showObservations: boolean;
  topoMap: TopoMap;
  showGeoSelectInfo: boolean;
  completedSimpleObsOnboarding: boolean | undefined;
  useRetinaMap: boolean;
  featureToggleDeveloperMode: boolean;
  featureToggeGpsDebug: boolean;
  copyright?: string;
  photographer?: string;

  /**
   * Tidspunkt (ms) for siste overstyring.
   * Alle overrides som er nyere enn dette vil kjøres, deretter oppdateres denne verdien.
   * Se user-setting-overrides.ts}
   */
  lastOverridden?: number;

  /**
   * true = use full/complete snow obs schemas
   * false/undefined = use simple snow obs schema
   */
  preferCompleteSnowObservations: boolean;

  /**
   * Ikke mas om utdaterte kartpakker før dette tidspunktet er passert
   */
  suppressOfflineMapUpdateNotificationUntil?: string; // i ISO8601-format
}
