import { GeoHazard } from './geo-hazard.enum';
import { AppMode } from './app-mode.enum';
import { LangKey } from './langKey';
import { TopoMap } from './topo-map.enum';

export interface UserSetting {
  appMode: AppMode;
  language: LangKey;
  currentGeoHazard: Array<GeoHazard>;
  observationDaysBack: Array<{ geoHazard: GeoHazard; daysBack: number }>;
  completedStartWizard: boolean;
  supportTiles: Array<{ name: string; enabled: boolean; opacity: number }>;
  showMapCenter: boolean;
  tilesCacheSizev2: number;
  showObservations: boolean;
  emailReceipt: boolean;
  topoMap: TopoMap;
  showGeoSelectInfo: boolean;
  useRetinaMap: boolean;
  consentForSendingAnalytics: boolean;
  consentForSendingAnalyticsDialogCompleted: boolean;
  featureToggleDeveloperMode: boolean;
  featureToggeGpsDebug: boolean;
  infoAboutObservationsRecievedTimestamp?: number;
  infoAboutSupportMapsRecievedTimestamp?: number;
}
