import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-snow-surface',
  templateUrl: './snow-surface.page.html',
  styleUrls: ['./snow-surface.page.scss'],
  imports: [
    IonicModule,
    HeaderColorDirective,
    NgIf,
    RegistrationContentWrapperComponent,
    KdvSelectComponent,
    NumericInputComponent,
    TextCommentComponent,
    EditImagesComponent,
    TranslateModule,
  ],
})
export class SnowSurfacePage extends BasePage {
  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.SnowSurfaceObservation, basePageService, activatedRoute);
  }
}
