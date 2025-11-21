import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { CompoundPackage, CompoundPackageMetadata } from 'src/app/pages/offline-map/metadata.model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { settings } from 'src/settings';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

interface ApiResponse {
  Items: CompoundPackageMetadata[];
}

@Injectable({
  providedIn: 'root',
})
export class PackageIndexService {
  private userSettings = inject(UserSettingService);
  private httpClient = inject(HttpClient);

  private apiUrl = toSignal(
    this.userSettings.appMode$.pipe(map((appMode) => settings.services.regObs.apiUrl[appMode] as string | undefined))
  );

  private indexResource = httpResource<ApiResponse>(() => `${this.apiUrl()}/OfflineMap/PackageIndex`);

  /**
   * true mens api-responsen laster.
   */
  isLoading = this.indexResource.isLoading;

  /**
   * Signal med error, hvis noe med api-responsen har feila.
   */
  error = this.indexResource.error;

  /**
   * Kartpakke-indeksen
   */
  index = computed(
    () => {
      if (!this.indexResource.hasValue()) {
        return [];
      }
      const response = this.indexResource.value();
      if (!response) {
        return [];
      }
      return response.Items.map((mapPackage) => new CompoundPackage(mapPackage));
    },
    { equal: (a, b) => a.length === b.length }
  );

  /**
   * Map med kartpakkenavn som nøkkel: "name" -> "DownloadableMapPackage"
   */
  map = computed(() => new Map(this.index().map((pkg) => [pkg.getName(), pkg])));
  map$ = toObservable(this.map);

  async getSasQueryParams() {
    const url = `${this.apiUrl()}/OfflineMap/QueryString`;
    return firstValueFrom(this.httpClient.get(url, { headers: { accept: 'text/plain' }, responseType: 'text' }));
  }
}
