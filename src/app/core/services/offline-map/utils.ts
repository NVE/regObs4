import { CompoundPackage } from 'src/app/pages/offline-map/metadata.model';
import { OfflineMapPackage } from './offline-map.model';

// Add test
export function isPackageOutdated(downloadedPackage: OfflineMapPackage, packageOnServer: CompoundPackage) {
  const downloadedPackageUpdateDate = downloadedPackage.compoundPackageMetadata.getLastModified();
  const packageOnServerUpdateDate = packageOnServer.getLastModified();
  return downloadedPackageUpdateDate < packageOnServerUpdateDate;
}
