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

enum SaveAsDraftRespone {
  Cancel = 'cancel',
  Save = 'save',
}

@Injectable()
export class SaveAsDraftRouteGuard implements CanDeactivate<OverviewPage | ObsLocationPage> {
  constructor(
    private alertController: AlertController,
    private draftService: DraftRepositoryService,
    private translateService: TranslateService
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
    const translations = await this.translateService
      .get([
        'REGISTRATION.SAVE_ALERT.HEADER',
        'REGISTRATION.SAVE_ALERT.MESSAGE',
        'REGISTRATION.SAVE_ALERT.NO',
        'REGISTRATION.SAVE_ALERT.YES'
      ])
      .toPromise();
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.SAVE_ALERT.HEADER'],
      message: translations['REGISTRATION.SAVE_ALERT.MESSAGE'],
      buttons: [
        {
          text: translations['REGISTRATION.SAVE_ALERT.NO'],
          role: SaveAsDraftRespone.Cancel
        },
        {
          text: translations['REGISTRATION.SAVE_ALERT.YES'],
          role: SaveAsDraftRespone.Save
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === SaveAsDraftRespone.Save;
  }
}
