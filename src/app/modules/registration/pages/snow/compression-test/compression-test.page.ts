import { Component, OnInit, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { ModalController } from '@ionic/angular';
import { CompressionTestModalPage } from './compression-test-modal/compression-test-modal.page';
import { CompressionTestDto, KdvElement } from '../../../../regobs-api/models';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.page.html',
  styleUrls: ['./compression-test.page.scss'],
})
export class CompressionTestPage extends BasePage {

  private propagation: KdvElement[];
  private fractureTypes: KdvElement[];

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
  ) {
    super(RegistrationTid.CompressionTest, basePageService, activatedRoute);
  }

  async onInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.propagation = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, 'Snow_PropagationKDV');
    this.fractureTypes = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, 'Snow_PropagationKDV');
  }

  getKdvElementName(id: number, kdvElements: KdvElement[]) {
    if (kdvElements) {
      const kdvElement = kdvElements.find((kdv) => kdv.Id === id);
      if (kdvElement) {
        return kdvElement.Name;
      }
    }
    return '';
  }

  async addOrEditCompressionTest(index?: number) {
    const modal = await this.modalController.create({
      component: CompressionTestModalPage,
      componentProps: { compressionTest: this.registration.CompressionTest[index] },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.ngZone.run(() => {
      if (result.data) {
        if (result.data.delete) {
          this.registration.CompressionTest.splice(index, 1);
        } else {
          const compressionTest: CompressionTestDto = result.data;
          if (index !== undefined) {
            this.registration.CompressionTest[index] = compressionTest;
          } else {
            this.registration.CompressionTest.push(compressionTest);
          }
        }
      }
    });
  }

  getDescription(compresstionTest: CompressionTestDto) {
    if (this.propagation && this.fractureTypes) {
      const result = [];
      result.push(this.getKdvElementName(compresstionTest.PropagationTID, this.propagation));
      if (compresstionTest.TapsFracture > 0) {
        result.push(compresstionTest.TapsFracture);
      }
      if (compresstionTest.FractureDepth > 0) {
        result.push(`@${compresstionTest.FractureDepth * 100}cm`);
      }
      if (compresstionTest.ComprTestFractureTID > 0) {
        result.push(this.getKdvElementName(compresstionTest.ComprTestFractureTID, this.fractureTypes));
      }
      return result.join('');
    }
  }
}
