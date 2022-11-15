import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { OverviewPage } from './overview/overview.page';
import { AlertController } from '@ionic/angular';
import { ObsLocationPage } from './obs-location/obs-location.page';
import { TranslateService } from '@ngx-translate/core';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import {
  ConfirmationModalService,
  PopupResponse
} from '../../../core/services/confirmation-modal/confirmation-modal.service';

@Injectable()
export class SaveAsDraftRouteGuard implements CanDeactivate<OverviewPage | ObsLocationPage> {
  constructor(
    private alertController: AlertController,
    private draftService: DraftRepositoryService,
    private translateService: TranslateService,
    private confirmationModal: ConfirmationModalService
  ) {
  }

  async canDeactivate(
    component: OverviewPage,
    activatedRoute: ActivatedRouteSnapshot,
    __: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) {
    const uuid = activatedRoute.params['id'];
    if (nextState && !this.isInWhitelist(nextState.url) && uuid != null) {
      const draft = await this.draftService.load(uuid);
      if (draft && draft.syncStatus === SyncStatus.Draft) {
        const save = await this.createAlert();
        if (!save) {
          await this.draftService.delete(draft.uuid);
        }
      }
    }
    return true;
  }

  isInWhitelist(url: string) {
    const whiteList = ['registration/', 'my-observations'];
    return whiteList.some((w) => url.indexOf(w) >= 0);
  }

  async createAlert() {
    return await this.confirmationModal.askForConfirmation(
      {
        message: 'REGISTRATION.SAVE_ALERT.MESSAGE',
        header: 'REGISTRATION.SAVE_ALERT.HEADER',
        buttons: [
          {
            text: 'REGISTRATION.SAVE_ALERT.NO',
            role: PopupResponse.CANCEL
          },
          {
            text: 'REGISTRATION.SAVE_ALERT.YES',
            role: PopupResponse.CONFIRM
          }
        ]
      });
  }
}
