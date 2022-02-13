import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { OverviewPage } from './overview/overview.page';
import { AlertController } from '@ionic/angular';
// import { RegistrationService } from '../services/registration.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { ObsLocationPage } from './obs-location/obs-location.page';
import { TranslateService } from '@ngx-translate/core';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Injectable()
export class SaveAsDraftRouteGuard
implements CanDeactivate<OverviewPage | ObsLocationPage> {
  constructor(
    private alertController: AlertController,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private draftRepositoryService: DraftRepositoryService
  ) {}

  async canDeactivate(
    component: OverviewPage,
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) {
    if (
      nextState &&
      !this.isInWhitelist(nextState.url) &&
      component.registration
    ) {
      const reg = await this.draftRepositoryService.load(component.registration.id);
      if (!reg || (reg && reg.syncStatus === SyncStatus.Draft)) { //TODO: Trenger vi å sjekke for dette? Kan det være man prøver å trykke tilbake etter man har sendt inn?
        const save = await this.createAlert();
        if (reg && !save) {
          await this.draftRepositoryService.delete(component.registration.id);
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
          role: 'cancel'
        },
        {
          text: translations['REGISTRATION.SAVE_ALERT.YES']
        }
      ]
    });
    alert.present();
    const result = await alert.onDidDismiss();
    return result.role !== 'cancel';
  }
}
