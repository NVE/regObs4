import { CompoundPackage } from 'src/app/pages/offline-map/metadata.model';
import { OfflineMapPackage } from './offline-map.model';

// Add test
export function isPackageOutdated(downloadedPackage: OfflineMapPackage, packageOnServer: CompoundPackage) {
  const downloadDate = getDownloadCompleteDate(downloadedPackage);
  const packageOnServerUpdateDate = packageOnServer.getLastModified();
  return downloadDate < packageOnServerUpdateDate;
}

export function getDownloadCompleteDate(downloadedPackage: OfflineMapPackage): Date {
  const timeInMs = downloadedPackage.downloadComplete * 1000;
  return new Date(timeInMs);
}
