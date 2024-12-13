import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { CompressionTestListComponent } from '../../../components/snow/compression-test-list/compression-test-list.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.page.html',
  styleUrls: ['./compression-test.page.scss'],
  imports: [
    IonicModule,
    HeaderColorDirective,
    NgIf,
    RegistrationContentWrapperComponent,
    CompressionTestListComponent,
    EditImagesComponent,
    TranslateModule,
  ],
})
export class CompressionTestPage extends BasePage {
  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.CompressionTest, basePageService, activatedRoute);
  }
}
