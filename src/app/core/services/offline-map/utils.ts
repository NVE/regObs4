import { CompoundPackage } from 'src/app/pages/offline-map/metadata.model';
import { OfflineMapPackage } from './offline-map.model';
import moment from 'moment';

/** Returnerer true om pakka som kan lastes ned nå er nyere enn den du allerede har lastet ned */
export function isPackageOutdated(downloadedPackage: OfflineMapPackage, packageOnServer: CompoundPackage) {
  const downloadedPackageUpdateDate = getProductionDate(downloadedPackage);
  const packageOnServerUpdateDate = packageOnServer.getLastModified();
  if (!downloadedPackageUpdateDate) {
    return true;
  }
  return downloadedPackageUpdateDate < packageOnServerUpdateDate;
}

/** Gir deg produksjonsdato for angitt kartpakke, eller 01.01.1970 00:00 om produksjonsdato mangler */
export function getProductionDate(downloadedPackage: OfflineMapPackage): Date {
  let latestDate = moment(0);
  const maps = Object.values(downloadedPackage.maps);
  for (const map of maps) {
    if (map.lastModified) {
      latestDate = moment.max(latestDate, moment(map.lastModified));
    }
  }
  return latestDate.toDate();
}

/** Gir deg tidspunktet for når pakka ble lastet ned */
export function getDownloadCompleteDate(downloadedPackage: OfflineMapPackage): Date {
  const timeInMs = downloadedPackage.downloadComplete * 1000;
  return new Date(timeInMs);
}
