import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { CompoundPackage, CompoundPackageMetadata } from 'src/app/pages/offline-map/metadata.model';

type PackageIndex = CompoundPackageMetadata[];

const PACKAGE_INDEX_URL = 'https://offlinemap.blob.core.windows.net/metadata/packageIndex_v5.json';

@Injectable({
  providedIn: 'root',
})
export class PackageIndexService {
  packages$: Observable<Map<string, CompoundPackage>>;

  constructor(http: HttpClient) {
    // Download package index from azure
    this.packages$ = http.get<PackageIndex>(PACKAGE_INDEX_URL).pipe(
      // Map downloaded package index to a packageName => package map
      map((packageIndex) => {
        const nameAndPkg: [string, CompoundPackage][] = packageIndex.map((p) => [
          CompoundPackage.GetNameFromXYZ(...p.xyz),
          new CompoundPackage(p),
        ]);
        return new Map(nameAndPkg);
      }),
      shareReplay()
    );
  }
}
