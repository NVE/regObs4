import { Injectable } from '@angular/core';
import { HelptextDto } from 'src/app/modules/common-regobs-api/models';
import { HelptextService as HelpTextApiService } from 'src/app/modules/common-regobs-api/services';
import { AppMode, LangKey, GeoHazard } from 'src/app/modules/common-core/models';

import { LoggerService, LanguageService, AppModeService } from 'src/app/modules/common-core/services';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OfflineDbService } from '../offline-db/offline-db.service';
import { ApiSyncOfflineBaseService } from '../api-sync-offline-base/api-sync-offline-base.service';
import { getLangKeyString } from 'src/app/modules/common-core/helpers';

const VALID_HELP_TEXT_SECONDS = 73200; // 12 hours
const HELP_TEXTS_ASSETS_FOLDER = '/assets/json';

@Injectable({
  providedIn: 'root'
})
export class HelpTextService extends ApiSyncOfflineBaseService<HelptextDto[]> {
  constructor(
    protected offlineDbService: OfflineDbService,
    protected languageService: LanguageService,
    protected appModeService: AppModeService,
    protected logger: LoggerService,
    private helpTextApiService: HelpTextApiService,
    private httpClient: HttpClient
  ) {
    super(
      {
        useLangKeyAsDbKey: true,
        validSeconds: VALID_HELP_TEXT_SECONDS
      },
      offlineDbService,
      languageService,
      appModeService,
      logger
    );
  }

  public getTableName(appMode: AppMode): string {
    return `${appMode.toLocaleLowerCase()}/helptexts`;
  }

  public getUpdatedData(_: AppMode, langKey: LangKey): Observable<HelptextDto[]> {
    return this.helpTextApiService.HelptextGet(langKey);
  }

  public getFallbackData(_: AppMode, langKey: LangKey): Observable<HelptextDto[]> {
    return this.httpClient.get<HelptextDto[]>(`${HELP_TEXTS_ASSETS_FOLDER}/helptexts.${getLangKeyString(langKey)}.json`).pipe(
      catchError((err) => {
        this.logger.warn(`Helptexts for language ${getLangKeyString(langKey)} not found in assets/kdvelements folder`, err);
        return of([]);
      })
    );
  }

  public getHelpTextObservable(geoHazard: GeoHazard, registrationTid: number): Observable<string> {
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
