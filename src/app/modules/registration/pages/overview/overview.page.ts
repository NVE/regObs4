import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { combineLatest, from, map, Observable, switchMap, takeUntil } from 'rxjs';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { SummaryItemService } from '../../services/summary-item.service';
import { RegistrationDraft, RegistrationDraftErrorCode } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { UserSetting } from 'src/app/core/models/user-settings.model';

/**
 * Overview page for a registration. If you edit an existing registration you start on this page.
 * If you create a new registration you end here after you have chosed date/time and location.
 * Have two modes:
 * 1) Standard mode: Show an overview of all schemas in the registration.
 * You can click on a schema go to a separate page for the schema
 * 2) Simple mode: A simplified schema, available only for snow observations.
 */
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

    //TODO: Hvorfor oppdateres ikke summaryItems$ når jeg endrer på lokasjon eller tid?
    this.summaryItems$ = combineLatest([this.draft$, this.userSettingService.userSetting$]).pipe(
      switchMap(([draft, userSetting]) => {
        if (userSetting.simpleSnowObservations) {
          return from(this.getLocationAndTimeSummaryItem(draft));
        } else {
          return this.summaryItemService.getSummaryItems$(uuid);
        }
      })
    );
  }

  private async getLocationAndTimeSummaryItem(draft: RegistrationDraft): Promise<ISummaryItem[]> {
    return [await this.summaryItemService.getLocationAndTimeSummaryItem(draft)];
  }

  draftHasStatusSync(draft: RegistrationDraft): boolean {
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSetting);
  }

  //If conflict or registration is gone, re-sumbit or cancelling is handled by the failed-registration-component
  hideSendButton(draft: RegistrationDraft): boolean {
    return this.draftHasStatusSync(draft)
    && [RegistrationDraftErrorCode.ConflictError, RegistrationDraftErrorCode.GoneError].includes(draft?.error?.code);
  }

  trackByFunction(index: number, item: ISummaryItem) {
    if (!item) {
      return null;
    }
    return item.href;
  }
}
