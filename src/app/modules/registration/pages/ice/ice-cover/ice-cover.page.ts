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
import { Component } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { BasePage } from '../../base.page';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { AddWebUrlItemComponent } from '../../../components/add-web-url-item/add-web-url-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-ice-cover',
  templateUrl: './ice-cover.page.html',
  styleUrls: ['./ice-cover.page.scss'],
  imports: [
    AddWebUrlItemComponent,
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
    KdvSelectComponent,
    NgIf,
    RegistrationContentWrapperComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class IceCoverPage extends BasePage {
  override registrationTid = RegistrationTid.IceCoverObs;

  constructor() {
    super();
  }
}
