import { GeoHazard, AppMode, LangKey } from '@varsom-regobs-common/core';
import { TopoMap } from './topo-map.enum';

export interface UserSetting {
  appMode: AppMode;
  language: LangKey;
  currentGeoHazard: Array<GeoHazard>;
  observationDaysBack: Array<{ geoHazard: GeoHazard; daysBack: number }>;
  completedStartWizard: boolean;
  supportTiles: Array<{ name: string; enabled: boolean; opacity: number }>;
  showMapCenter: boolean;
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
