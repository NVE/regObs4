import { Component, OnInit } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';
import { HttpClient } from '@angular/common/http';
import { ModalController, LoadingController } from '@ionic/angular';
import { FullscreenImageModalPage } from '../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { DataUrlHelper } from '../../../../../core/helpers/data-url.helper';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-snow-profile',
  templateUrl: './snow-profile.page.html',
  styleUrls: ['./snow-profile.page.scss'],
})
export class SnowProfilePage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private modalController: ModalController,
    private loadingController: LoadingController,
  ) {
    super(RegistrationTid.SnowProfile2, basePageService, activatedRoute);
  }

  onInit() {
  }

  isEmpty() {
    return IsEmptyHelper.isEmpty(this.registration.request.SnowProfile2)
      && !(this.registration.request.CompressionTest || [])
        .some((ct) => ct.IncludeInSnowProfile === true);
  }

  async openPreview() {
    const loader = await this.loadingController.create({
      message: 'Genererer preview...'
    });
    await loader.present();
    this.httpClient.post('http://localhost:40001/Registration/PlotPreviewPng?format=1&height=400&width=400&langKey=1',
      this.registration.request, {
        responseType: 'blob',
      }).subscribe(async (result) => {
        const dataUrl = await DataUrlHelper.toDataUrl(result, 'image/png');
        this.openImageModal(dataUrl);
        this.loadingController.dismiss();
      }, () => {
        this.loadingController.dismiss();
      });
    // this.registrationApiService.rootUrl = 'http://localhost:40001';
    // this.registrationApiService.RegistrationPlotPreviewPngResponse({
    //     registration: this.registration.request,
    //     format: 0,
    //     height: 400,
    //     width: 400,
    //     langKey: 1,
    // }).subscribe((result) => {
    //   if (result.ok) {
    //     const img = result.body;
    //   }
    // });
  }

  private async openImageModal(src: string) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: src
      },
    });
    modal.present();
  }
}
