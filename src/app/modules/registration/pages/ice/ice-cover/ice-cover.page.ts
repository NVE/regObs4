import { Component } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../../components/add-web-url-item/add-web-url-item.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ice-cover',
  templateUrl: './ice-cover.page.html',
  styleUrls: ['./ice-cover.page.scss'],
  imports: [
    IonicModule,
    HeaderColorDirective,
    NgIf,
    RegistrationContentWrapperComponent,
    KdvSelectComponent,
    TextCommentComponent,
    EditImagesComponent,
    AddWebUrlItemComponent,
    TranslateModule,
  ],
})
export class IceCoverPage extends BasePage {
  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.IceCoverObs, basePageService, activatedRoute);
  }
}
