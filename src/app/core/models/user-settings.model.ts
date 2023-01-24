import { GeoHazard, AppMode, LangKey } from 'src/app/modules/common-core/models';
import { TopoMap } from './topo-map.enum';
import { SupportTileStore } from './support-tile.model';

export interface UserSetting {
  appMode: AppMode;
  language: LangKey;
  currentGeoHazard: Array<GeoHazard>;
  observationDaysBack: Array<{ geoHazard: GeoHazard; daysBack: number }>;
  completedStartWizard: boolean;
  supportTiles: Array<SupportTileStore>;
  showMapCenter: boolean;
  showObservations: boolean;
  emailReceipt: boolean;
  topoMap: TopoMap;
  showGeoSelectInfo: boolean;
  completedSimpleObsOnboarding: boolean | undefined;
  useRetinaMap: boolean;
  consentForSendingAnalytics: boolean;
  consentForSendingAnalyticsDialogCompleted: boolean;
  featureToggleDeveloperMode: boolean;
  featureToggeGpsDebug: boolean;
  infoAboutObservationsRecievedTimestamps?: { [name: string]: number };
  infoAboutSupportMapsRecievedTimestamps?: { [name: string]: number };
  infoAboutOfflineSupportMapsRecievedTimestamps?: { [name: string]: number };
  copyright?: string;
  photographer?: string;

  /**
   * true = use full/complete snow obs schemas
   * false/undefined = use simple snow obs schema
   */
  preferCompleteSnowObservations: boolean;
}
