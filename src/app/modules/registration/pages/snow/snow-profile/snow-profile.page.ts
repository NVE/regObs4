import { Component, OnInit } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { BasePage } from '../../base.page';
import { HttpClient } from '@angular/common/http';
import {
  ModalController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { FullscreenImageModalPage } from '../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { DataUrlHelper } from '../../../../../core/helpers/data-url.helper';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from '../../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../../settings';
import { from, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { UserSetting } from '../../../../../core/models/user-settings.model';
import { LoggingService } from '../../../../shared/services/logging/logging.service';

const DEBUG_TAG = 'SnowProfilePage';

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.page.html',
  styleUrls: ['./snow-profile.page.scss']
})
export class SnowProfilePage extends BasePage {
  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private translateService: TranslateService,
    private userSettingService: UserSettingService,
    private loggingService: LoggingService
  ) {
    super(RegistrationTid.SnowProfile2, basePageService, activatedRoute);
  }

  onInit() {}

  isEmpty() {
    return (
      IsEmptyHelper.isEmpty(this.registration.request.SnowProfile2) &&
      !(this.registration.request.CompressionTest || []).some(
        (ct) => ct.IncludeInSnowProfile === true
      )
    );
  }

  async openPreview() {
    this.translateService
      .get('REGISTRATION.SNOW.SNOW_PROFILE.GENERATING_PREVIEW')
      .subscribe(async (message) => {
        const loader = await this.loadingController.create({
          message,
          backdropDismiss: true // enable cancel
        });
        await loader.present();
        const userSetting = await this.userSettingService.userSetting$
          .pipe(take(1))
          .toPromise();
        const format = 5; // Mobile profile plot
        const size = 400;
        const subscription = this.getPlotFromApiWithFallback(
          userSetting,
          format,
          size
        ).subscribe(
          (result) => {
            this.openImageModal(result);
            this.loadingController.dismiss();
          },
          (err) => {
            this.loadingController.dismiss();
            this.showPreviewError();
          }
        );
        await loader.onDidDismiss();
        subscription.unsubscribe();
      });
  }

  private getPlotFromApiWithFallback(
    userSetting: UserSetting,
    format: number,
    size: number
  ) {
    return this.getPlotFromApi(userSetting, format, size).pipe(
      catchError((error) => {
        this.loggingService.debug('Could not generate plot', DEBUG_TAG);
        if (format === 5) {
          this.loggingService.debug('Fallback to BareSimpleProfile', DEBUG_TAG);
          return this.getPlotFromApi(userSetting, 4, size); // fallback to BareSimpleProfile when mobile plot failed
        }
        return of(null);
      }),
      switchMap((result) => from(DataUrlHelper.toDataUrl(result, 'image/png')))
    );
  }

  private getPlotFromApi(
    userSetting: UserSetting,
    format: number,
    size: number
  ) {
    const rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
    return this.httpClient.post(
      `${rootUrl}/Registration/PlotPreviewPng?format=${format}` +
        `&height=${size}&width=${size}&langKey=${userSetting.language}`,
      this.registration.request,
      {
        responseType: 'blob'
      }
    );
  }

  private hasAnyTempLayers() {
    return (
      this.registration.request.SnowProfile2 &&
      this.registration.request.SnowProfile2.SnowTemp &&
      this.registration.request.SnowProfile2.SnowTemp.Layers &&
      this.registration.request.SnowProfile2.SnowTemp.Layers.some(
        (x) => x.SnowTemp < 0
      )
    );
  }

  private async showPreviewError() {
    this.translateService
      .get('REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ERROR')
      .subscribe(async (message) => {
        const toast = await this.toastController.create({
          message: message,
          mode: 'md',
          duration: 2000
        });
        toast.present();
      });
  }

  private async openImageModal(src: string) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: src
      }
    });
    modal.present();
  }
}
