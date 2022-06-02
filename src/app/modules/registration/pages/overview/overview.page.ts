import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { firstValueFrom, map, Observable, takeUntil } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { UserSetting } from 'src/app/core/models/user-settings.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPage extends NgDestoryBase implements OnInit {
  summaryItems$: Observable<Array<ISummaryItem>>;
  draft$: Observable<RegistrationDraft>;
  userSetting: UserSetting;
  simpleSnowObsMode: boolean;
  showSnowObsModeSelector$: Observable<boolean>;

  constructor(
    private draftService: DraftRepositoryService,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private userGroupService: UserGroupService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone
  ) {
    super();
  }

  ngOnInit() {
    const uuid = this.activatedRoute.snapshot.params['id'];
    this.draft$ = this.draftService.getDraft$(uuid);
    this.summaryItems$ = this.summaryItemService.getSummaryItems$(uuid);
    this.userGroupService.updateUserGroups();

    this.userSettingService.userSetting$.pipe(takeUntil(this.ngDestroy$))
      .subscribe((setting) => {
        this.ngZone.run(() => {
          this.userSetting = setting;
        });
      });

    this.showSnowObsModeSelector$ = this.draft$.pipe(
      map((draft) => draft.registration.GeoHazardTID === GeoHazard.Snow)
    );
  }

  draftHasStatusSync(draft: RegistrationDraft): boolean {
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSetting);
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }
}
