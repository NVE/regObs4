import {
  IonToolbar,
  IonListHeader,
  IonLabel,
  IonContent,
  IonBackButton,
  IonTitle,
  IonList,
  IonHeader,
  IonButtons,
} from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { CompressionTestListComponent } from '../../../components/snow/compression-test-list/compression-test-list.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.page.html',
  styleUrls: ['./compression-test.page.scss'],
  imports: [
    CompressionTestListComponent,
    EditImagesComponent,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    NgIf,
    RegistrationContentWrapperComponent,
    TranslatePipe,
  ],
})
export class CompressionTestPage extends BasePage {
  constructor() {
    const basePageService = inject(BasePageService);
    const activatedRoute = inject(ActivatedRoute);

    super(RegistrationTid.CompressionTest, basePageService, activatedRoute);
  }
}
