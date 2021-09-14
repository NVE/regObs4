import { Injectable } from '@angular/core';
import { AppMode, LanguageService, LangKey, getLangKeyString, LoggerService, AppModeService } from '@varsom-regobs-common/core';
import { of, Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { KdvElementsResponseDto, KdvElementsService, KdvElement } from '@varsom-regobs-common/regobs-api';
import { OfflineDbService } from '../offline-db/offline-db.service';
import { HttpClient } from '@angular/common/http';
import { KdvKey } from '../../models/kdv-key.type';
import { KdvViewRepositoryKey } from '../../models/view-repository-key.type';
import { ApiSyncOfflineBaseService } from '../api-sync-offline-base/api-sync-offline-base.service';

const KDV_ASSETS_FOLDER = '/assets/kdvelements'; // TODO: Add this to module config?

@Injectable({
  providedIn: 'root'
})
export class KdvService extends ApiSyncOfflineBaseService<KdvElementsResponseDto> {

  constructor(protected offlineDbService: OfflineDbService,
    protected languageService: LanguageService,
    protected logger: LoggerService,
    protected appModeService: AppModeService,
    private kdvElementsService: KdvElementsService,
    private httpClient: HttpClient)  {
    super({ useLangKeyAsDbKey: true, validSeconds: 12 * 60 * 60 }, offlineDbService, languageService, appModeService, logger);
  }

  public getKdvRepositoryByKeyObservable(key: KdvKey): Observable<KdvElement[]> {
    return this.data$.pipe(map((val) => val.KdvRepositories[key]));
  }

  public getViewRepositoryByKeyObservable(key: KdvViewRepositoryKey): Observable<unknown> {
    return this.data$.pipe(map((val) => val.ViewRepositories[key]));
  }

  public getUpdatedData(_: AppMode, langKey: LangKey): Observable<KdvElementsResponseDto> {
    return this.kdvElementsService.KdvElementsGetKdvs({ langkey: langKey });
  }

  public getTableName(appMode: AppMode): string {
    return `${appMode.toLocaleLowerCase()}/kdvelements`;
  }

  public getFallbackData(_: AppMode, langKey: LangKey): Observable<KdvElementsResponseDto> {
    return this.httpClient.get<KdvElementsResponseDto>
    (`${KDV_ASSETS_FOLDER}/kdvelements.${getLangKeyString(langKey)}.json`)
      .pipe(catchError((err) => {
        this.logger.warn(`Kdv elements for language ${getLangKeyString(langKey)} not found in assets/kdvelements folder`, err);
        return of({
          KdvRepositories: {},
          ViewRepositories: {}
        });
      }));
  }
}
