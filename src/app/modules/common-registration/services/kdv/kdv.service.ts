import { Injectable } from '@angular/core';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { LanguageService, AppModeService } from 'src/app/modules/common-core/services';
import { getLangKeyString } from 'src/app/modules/common-core/helpers';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { KdvElementsResponseDto, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { KdvElementsService } from 'src/app/modules/common-regobs-api/services';
import { OfflineDbService } from '../offline-db/offline-db.service';
import { HttpClient } from '@angular/common/http';
import { KdvKey } from '../../models/kdv-key.type';
import { KdvViewRepositoryKey } from '../../models/view-repository-key.type';
import { ApiSyncOfflineBaseService } from '../api-sync-offline-base/api-sync-offline-base.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const KDV_ASSETS_FOLDER = '/assets/json';
const CACHE_AGE = 43200; // 12 hours

@Injectable({
  providedIn: 'root'
})
export class KdvService extends ApiSyncOfflineBaseService<KdvElementsResponseDto> {
  constructor(
    protected offlineDbService: OfflineDbService,
    protected languageService: LanguageService,
    protected logger: LoggingService,
    protected appModeService: AppModeService,
    private kdvElementsService: KdvElementsService,
    private httpClient: HttpClient
  ) {
    super(
      {
        useLangKeyAsDbKey: true,
        validSeconds: CACHE_AGE
      },
      offlineDbService,
      languageService,
      appModeService,
      logger);
  }

  protected getDebugTag(): string {
    return 'KdvService';
  }

  public getKdvRepositoryByKeyObservable(key: KdvKey): Observable<KdvElement[]> {
    return this.data$.pipe(map((val) => val.KdvRepositories[key]));
  }

  public getViewRepositoryByKeyObservable(key: KdvViewRepositoryKey): Observable<unknown> {
    return this.data$.pipe(map((val) => val.ViewRepositories[key]));
  }

  protected getUpdatedData(_: AppMode, langKey: LangKey): Observable<KdvElementsResponseDto> {
    return this.kdvElementsService.KdvElementsGetKdvs({ langkey: langKey });
  }

  protected getTableName(appMode: AppMode): string {
    return `${appMode.toLocaleLowerCase()}/kdvelements`;
  }

  protected getFallbackData(_: AppMode, langKey: LangKey): Observable<KdvElementsResponseDto> {
    const filename = `${KDV_ASSETS_FOLDER}/kdvelements.${getLangKeyString(langKey)}.json`;
    return this.httpClient.get<KdvElementsResponseDto>(filename).pipe(
      catchError((err) => {
        this.logger.error(err, this.getDebugTag(), `${filename} not found`);
        return of({
          KdvRepositories: {},
          ViewRepositories: {}
        });
      })
    );
  }
}
