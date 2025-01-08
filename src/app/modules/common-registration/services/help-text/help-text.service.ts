import { Injectable, inject } from '@angular/core';
import { HelptextDto } from 'src/app/modules/common-regobs-api/models';
import { HelptextService as HelpTextApiService } from 'src/app/modules/common-regobs-api/services';
import { AppMode, LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiSyncOfflineBaseService } from '../api-sync-offline-base/api-sync-offline-base.service';
import { getLangKeyString } from 'src/app/modules/common-core/helpers';

const HELP_TEXTS_ASSETS_FOLDER = '/assets/json';

@Injectable({
  providedIn: 'root',
})
export class HelpTextService extends ApiSyncOfflineBaseService<HelptextDto[]> {
  private helpTextApiService = inject(HelpTextApiService);
  private httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  protected getDebugTag(): string {
    return 'HelpTextService';
  }

  protected getOfflineDatabaseKey(appMode: AppMode, langKey: LangKey): string {
    return `helptexts.${appMode.toLocaleUpperCase()}.${langKey.toLocaleString()}`;
  }

  protected getUpdatedData(_: AppMode, langKey: LangKey): Observable<HelptextDto[]> {
    return this.helpTextApiService.HelptextGet(langKey);
  }

  protected getFallbackData(_: AppMode, langKey: LangKey): Observable<HelptextDto[]> {
    const filename = `${HELP_TEXTS_ASSETS_FOLDER}/helptexts.${getLangKeyString(langKey)}.json`;
    return this.httpClient.get<HelptextDto[]>(filename).pipe(
      catchError((err) => {
        this.logger.error(err, this.getDebugTag(), `${filename} not found`);
        return of([]);
      })
    );
  }

  public getHelpTextObservable(geoHazard: GeoHazard, registrationTid: number): Observable<string | undefined> {
    return this.data$.pipe(
      map((helptexts: HelptextDto[]) =>
        helptexts.find((data) => data.GeoHazardTID === geoHazard && data.RegistrationTID === registrationTid)
      ),
      map((helpText) => (helpText ? helpText.Text : undefined))
    );
  }

  public hasHelpTextObservable(geoHazard: GeoHazard, registrationTid: number): Observable<boolean> {
    return this.getHelpTextObservable(geoHazard, registrationTid).pipe(map((val) => !!val));
  }
}
