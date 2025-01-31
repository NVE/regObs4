import { Component, computed, inject, input, linkedSignal } from '@angular/core';
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
export class AddWebUrlModalPage {
  private modalController = inject(ModalController);

  readonly url = input<UrlEditModel>();
  isNew = computed(() => this.url() != null);
  urlLine = linkedSignal(() => this.url()?.UrlLine);
  urlDesc = linkedSignal(() => this.url()?.UrlDescription);

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    const UrlLine = this.urlLine();
    const UrlDescription = this.urlDesc();
    const edit: UrlEditModel = {
      ...(UrlLine ? { UrlLine } : {}),
      ...(UrlDescription ? { UrlDescription } : {}),
    };
    this.modalController.dismiss(edit);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
