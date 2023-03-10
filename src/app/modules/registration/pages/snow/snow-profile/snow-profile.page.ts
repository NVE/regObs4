import { Component } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import { HttpClient } from '@angular/common/http';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FullscreenImageModalPage } from '../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { DataUrlHelper } from '../../../../../core/helpers/data-url.helper';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from '../../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../../settings';
import { firstValueFrom, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserSetting } from '../../../../../core/models/user-settings.model';
import { LoggingService } from '../../../../shared/services/logging/logging.service';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import { SelectOption } from 'src/app/modules/shared/components/input/select/select-option.model';
import { SnowProfileEditModel } from 'src/app/modules/common-regobs-api';

const DEBUG_TAG = 'SnowProfilePage';

/**
 * Main snow profile page.
 *
 * Contains sub forms:
 *   - Snow profile
 *   - Temp profile
 *   - Density
 *   - Tests
 */
@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.page.html',
  styleUrls: ['./snow-profile.page.scss'],
})
export class SnowProfilePage extends BasePage {
  expositionOptions: SelectOption[] = [
    { id: 0, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH' },
    { id: 1, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_EAST' },
    { id: 2, text: 'REGISTRATION.SNOW.SNOW_PROFILE.EAST' },
    { id: 3, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_EAST' },
    { id: 4, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH' },
    { id: 5, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_WEST' },
    { id: 6, text: 'REGISTRATION.SNOW.SNOW_PROFILE.WEST' },
    { id: 7, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_WEST' },
  ];

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

  get snowProfile(): SnowProfileEditModel {
    return this.draft.registration.SnowProfile2;
  }

  noLayersInSnowProfile(): boolean {
    return isEmpty(this.snowProfile);
  }

  private noTestsIncludedInSnowProfile(): boolean {
    return !(this.draft.registration.CompressionTest || []).some((ct) => ct.IncludeInSnowProfile === true);
  }

  isEmpty() {
    const isEmptyResult = this.noLayersInSnowProfile() && this.noTestsIncludedInSnowProfile() && super.isEmpty();
    return Promise.resolve(isEmptyResult);
  }

  async openPreview() {
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.GENERATING_PREVIEW').subscribe(async (message) => {
      const loader = await this.loadingController.create({
        message,
        backdropDismiss: true, // enable cancel
      });
      await loader.present();
      const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
      const format = 5; // Mobile profile plot
      const size = 400;
      const subscription = this.getPlotFromApiWithFallback(userSetting, format, size).subscribe(
        (result) => {
          this.openImageModal(result);
          this.loadingController.dismiss();
        },
        // Error handler
        () => {
          this.loadingController.dismiss();
          this.showPreviewError();
        }
      );
      await loader.onDidDismiss();
      subscription.unsubscribe();
    });
  }

  private getPlotFromApiWithFallback(userSetting: UserSetting, format: number, size: number) {
    return this.getPlotFromApi(userSetting, format, size).pipe(
      catchError(() => {
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

  private getPlotFromApi(userSetting: UserSetting, format: number, size: number) {
    const rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
    return this.httpClient.post(
      `${rootUrl}/Registration/PlotPreviewPng?format=${format}` +
        `&height=${size}&width=${size}&langKey=${userSetting.language}`,
      this.draft.registration,
      {
        responseType: 'blob',
      }
    );
  }

  private async showPreviewError() {
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ERROR').subscribe(async (message) => {
      const toast = await this.toastController.create({
        message: message,
        mode: 'md',
        duration: 2000,
      });
      toast.present();
    });
  }

  private async openImageModal(src: string) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      cssClass: 'full-image-screen-modal',
      componentProps: {
        snowProfile: src,
      },
    });
    modal.present();
  }
}
