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
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { RegistrationContentWrapperComponent } from '../../../components/registration-content-wrapper/registration-content-wrapper.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { EditImagesComponent } from '../../../components/edit-images/edit-images.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avalanche-evaluation',
  templateUrl: './avalanche-evaluation.page.html',
  styleUrls: ['./avalanche-evaluation.page.scss'],
  imports: [
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
    TranslateModule,
  ],
})
export class AvalancheEvaluationPage extends BasePage {
  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.AvalancheEvaluation3, basePageService, activatedRoute);
  }

  onBeforeLeave() {
    if (!this.isEmpty() && this.draft.registration.AvalancheEvaluation3.AvalancheDangerTID === undefined) {
      this.draft.registration.AvalancheEvaluation3.AvalancheDangerTID = 0;
      // NOTE: If anything is registered, but danger is not set, set to 0 - not evaluated
    }
  }
}
