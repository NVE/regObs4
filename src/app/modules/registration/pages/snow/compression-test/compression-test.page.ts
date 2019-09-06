import { Component, NgZone } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { ModalController } from '@ionic/angular';
import { CompressionTestDto, KdvElement } from '../../../../regobs-api/models';
import { KdvService } from '../../../../../core/services/kdv/kdv.service';
import { Subscription, combineLatest } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { CompressionTestModalPage } from '../../../components/snow/compression-test-list/compression-test-modal/compression-test-modal.page';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.page.html',
  styleUrls: ['./compression-test.page.scss'],
})
export class CompressionTestPage extends BasePage {

  private propagation: KdvElement[];
  private fractureTypes: KdvElement[];

  private kdvSubscription: Subscription;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private ngZone: NgZone,
    private kdvService: KdvService,
  ) {
    super(RegistrationTid.CompressionTest, basePageService, activatedRoute);
  }
}
