import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { firstValueFrom, from, map, Observable, switchMap, takeUntil } from 'rxjs';
import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
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
import { getRegistrationName } from 'src/app/modules/common-registration/registration.helpers';
import { DangerObsEditModel, SnowSurfaceEditModel } from 'src/app/modules/common-regobs-api';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonToggle } from '@ionic/angular';

const DEBUG_TAG = 'OverviewPage';

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
    private ngZone: NgZone,
    private logger: LoggingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private draftRepository: DraftRepositoryService
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
      map((draft) => draft.registration.GeoHazardTID === GeoHazard.Snow && !this.syncFailed(draft))
    );

    this.summaryItems$ = this.draft$.pipe(
      switchMap((draft) => {
        if (this.showSimpleMode(draft)) {
          return from(this.getLocationAndTimeSummaryItem(draft));
        } else {
          return this.summaryItemService.getSummaryItems$(uuid);
        }
      })
    );
  }

  private syncFailed(draft: RegistrationDraft): boolean {
    return draft.error && this.draftHasStatusSync(draft);
  }

  private async getLocationAndTimeSummaryItem(draft: RegistrationDraft): Promise<ISummaryItem[]> {
    return [await this.summaryItemService.getLocationAndTimeSummaryItem(draft)];
  }

  showSimpleMode(draft: RegistrationDraft): boolean {
    if (this.syncFailed(draft)) {
      return false;
    }
    return draft.simpleMode;
  }

  draftHasStatusSync(draft: RegistrationDraft): boolean {
    return draft?.syncStatus === SyncStatus.Sync || draft?.syncStatus === SyncStatus.SyncAndIgnoreVersionCheck;
  }

  async changeMode(event: CustomEvent) {
    const draft = await firstValueFrom(this.draft$);
    if (event.detail.checked != draft.simpleMode) {
      //we only want to change mode if toogle value is different than current mode
      if (event.detail.checked) {
        //user wants to change mode to simple
        if (this.draftContainsDataNotAvailableForSimpleMode(draft)) {
          const okToConvertToSimple = await this.requestConvertToSimple();
          if (okToConvertToSimple) {
            const simpleDraft = {
              ...this.clearDataNotAvailableInSimpleSnowObs(draft),
            };
            this.saveDraftAndSimpleModeSetting(simpleDraft, true);
          } else {
            //user canceled convert to simple, so unset toggle and abort
            const target: IonToggle = event.target as unknown as IonToggle;
            target.checked = false; //unset toggle
          }
        } else {
          //draft is compatible with simple mode, so change to simple mode
          this.saveDraftAndSimpleModeSetting(draft, true);
        }
      } else if (draft.simpleMode) {
        //user want to change mode to standard
        this.saveDraftAndSimpleModeSetting(draft, false);
      }
    }
  }

  private async saveDraftAndSimpleModeSetting(draft: RegistrationDraft, simpleMode: boolean): Promise<void> {
    const draftToSave: RegistrationDraft = {
      ...draft,
      simpleMode
    };
    this.draftRepository.save(draftToSave); //save mode on draft
    this.userSetting.preferCompleteSnowObservations = !simpleMode;
    this.userSettingService.saveUserSettings(this.userSetting); //save default mode for new registrations
  }

  private async requestConvertToSimple(): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const translations = await firstValueFrom(this.translateService
      .get([
        'REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.HEADER',
        'REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.MESSAGE',
        'REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.YES',
        'REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.CANCEL',
      ]));
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.HEADER'],
      message: translations['REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.MESSAGE'],
      buttons: [
        {
          text: translations['REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.CANCEL'],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolveFunction(false)
        },
        {
          text: translations['REGISTRATION.OVERVIEW.SIMPLE.CONFIRM.YES'],
          handler: () => resolveFunction(true)
        }
      ]
    });
    await alert.present();
    return promise;
  }

  private draftContainsDataNotAvailableForSimpleMode(draft: RegistrationDraft): boolean {
    for (const registrationTid of this.getRegistrationTidsNotAvailableInSimpleSnowObs()) {
      const propName = getRegistrationName(registrationTid);
      const property = draft.registration[propName];
      if (!isEmpty(property)) {
        this.logger.debug(`Draft ${draft.uuid}. RegistrationTID: ${propName} has data. Not available in simple mode`);
        return true;
      }
    }
    //TODO: Check attachments?
    return false;
  }

  private getRegistrationTidsForSimpleSnowObs(): RegistrationTid[] {
    return [RegistrationTid.DangerObs, RegistrationTid.SnowSurfaceObservation];
  }

  private getRegistrationTidsNotAvailableInSimpleSnowObs(): RegistrationTid[] {
    const allTids = Object.values(RegistrationTid) as RegistrationTid[];
    const simpleTids = this.getRegistrationTidsForSimpleSnowObs();
    return allTids.filter((tid) => !simpleTids.includes(tid));
  }

  private clearDataNotAvailableInSimpleSnowObs(draft: RegistrationDraft): RegistrationDraft {
    this.logger.debug(`Converting draft ${draft.uuid} to simple mode...`, DEBUG_TAG, draft);
    const result: RegistrationDraft = {
      ...draft,
      registration: {
        GeoHazardTID: draft.registration.GeoHazardTID,
        DtObsTime: draft.registration.DtObsTime,
        ObsLocation: draft.registration.ObsLocation,
        Attachments: draft.registration.Attachments,
        SnowSurfaceObservation: this.getSimpleSnowSurfaceObservation(draft),
        DangerObs: this.filterSnowDangerObs(draft)

        //TODO: Ta med skiføre
      }
    };
    this.logger.debug(`Draft ${draft.uuid} converted to simple mode`, DEBUG_TAG, draft);
    return result;
  }

  private getSimpleSnowSurfaceObservation(draft: RegistrationDraft): SnowSurfaceEditModel {
    if (draft.registration.SnowSurfaceObservation == null) {
      return {};
    }
    return {
      SnowSurfaceTID: draft.registration.SnowSurfaceObservation.SnowSurfaceTID,
      SnowDepth: draft.registration.SnowSurfaceObservation.SnowDepth,
      NewSnowDepth24: draft.registration.SnowSurfaceObservation.NewSnowDepth24
    };
  }

  private filterSnowDangerObs(draft: RegistrationDraft): DangerObsEditModel[] {
    const result: DangerObsEditModel[] = [];
    if (draft.registration.DangerObs == null) {
      return [];
    }
    const snowDangerObses = draft.registration.DangerObs.filter(obs => obs.GeoHazardTID == GeoHazard.Snow);
    for (const dangerObs of snowDangerObses) {
      if (dangerObs.GeoHazardTID == GeoHazard.Snow) {
        const snowObs: DangerObsEditModel = {
          GeoHazardTID: GeoHazard.Snow,
          DangerSignTID: dangerObs.DangerSignTID
        };
        result.push(snowObs);
      }
    }
    return result;
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
