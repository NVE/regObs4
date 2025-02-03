import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { IonIcon, IonItem, ModalController } from '@ionic/angular/standalone';
import { AddWebUrlModalPage } from '../../pages/add-web-url-modal/add-web-url-modal.page';
import { UrlViewModel } from 'src/app/modules/common-regobs-api/models';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-web-url-item',
  templateUrl: './add-web-url-item.component.html',
  styleUrls: ['./add-web-url-item.component.scss'],
  imports: [IonIcon, IonItem, NgFor, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWebUrlItemComponent {
  private modalController = inject(ModalController);

  readonly title = input('REGISTRATION.ADD_WEB_URL.TITLE');
  readonly weburls = model<UrlViewModel[]>();
  readonly iconColor = input('dark');

  constructor() {
    addIcons({ addCircleOutline });
  }

  async addOrEdit(index?: number) {
    const weburl = this.getWebUrlByIndex(index);
    const modal = await this.modalController.create({
      component: AddWebUrlModalPage,
      componentProps: { url: weburl },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      if (result.data.delete) {
        this.removeAtIndex(index);
      } else {
        if (index !== undefined) {
          this.setWebUrl(index, result.data);
        } else {
          this.addWebUrl(result.data);
        }
      }
    }
  }

  setWebUrl(index: number, url: UrlViewModel) {
    this.weburls.update((urls) => (urls || []).map((u, i) => (i === index ? url : u)));
  }

  addWebUrl(url: UrlViewModel) {
    this.weburls.update((urls) => [...(urls || []), url]);
  }

  removeAtIndex(index?: number) {
    this.weburls.update((urls) => (urls || []).filter((url, i) => i !== index));
  }

  private getWebUrlByIndex(index?: number) {
    const webUrls = this.weburls();
    if (webUrls && index != null) {
      return webUrls[index];
    }

    return undefined;
  }
}
