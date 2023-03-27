import { Injectable } from '@angular/core';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
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
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const KDV_ASSETS_FOLDER = '/assets/json';

@Injectable({
  providedIn: 'root',
})
export class KdvService extends ApiSyncOfflineBaseService<KdvElementsResponseDto> {
  constructor(
    protected offlineDbService: OfflineDbService,
    protected logger: LoggingService,
    private kdvElementsService: KdvElementsService,
    private httpClient: HttpClient,
    protected userSettingService: UserSettingService
  ) {
    super(offlineDbService, logger, userSettingService);
  }

  protected getDebugTag(): string {
    return 'KdvService';
  }

  public getKdvRepositoryByKeyObservable(key: KdvKey): Observable<KdvElement[]> {
    return this.data$.pipe(
      map((kdvElementsresponse) => {
        // used to return correct name on Soil, as it is still returned as Dirt from API
        if (key.includes('Soil')) {
          key = key.replace('Soil', 'Dirt') as KdvKey;
        }
        const kdvsForGivenKey = kdvElementsresponse.KdvRepositories[key];
        if (!kdvsForGivenKey) {
          this.logger.log(`No KDVs for '${key}', returning empty array`, null, LogLevel.Warning, this.getDebugTag());
          return [];
        }
        return kdvsForGivenKey;
      })
    );
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
          ViewRepositories: {},
        });
      })
    );
  }
}
