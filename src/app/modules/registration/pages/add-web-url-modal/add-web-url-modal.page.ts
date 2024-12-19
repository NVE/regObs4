import { Component, OnInit, Input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { UrlEditModel } from 'src/app/modules/common-regobs-api/models';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { TextCommentComponent } from '../../components/text-comment/text-comment.component';
import { FormsModule } from '@angular/forms';
import { ModalSaveOrDeleteButtonsComponent } from '../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-web-url-modal',
  templateUrl: './add-web-url-modal.page.html',
  styleUrls: ['./add-web-url-modal.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    ModalSaveOrDeleteButtonsComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class AddWebUrlModalPage implements OnInit {
  @Input() weburl: UrlEditModel;
  urlToSave: UrlEditModel;
  isNew = true;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.weburl) {
      this.urlToSave = { ...this.weburl };
      this.isNew = false;
    } else {
      this.urlToSave = {};
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.urlToSave);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
