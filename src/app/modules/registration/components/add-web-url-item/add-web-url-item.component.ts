import {
  Component,
  OnInit,
  Input,
  NgZone,
  Output,
  EventEmitter
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddWebUrlModalPage } from '../../pages/add-web-url-modal/add-web-url-modal.page';
import { UrlViewModel } from 'src/app/modules/common-regobs-api/models';

@Component({
  selector: 'app-add-web-url-item',
  templateUrl: './add-web-url-item.component.html',
  styleUrls: ['./add-web-url-item.component.scss']
})
export class AddWebUrlItemComponent implements OnInit {
  @Input() title = 'REGISTRATION.ADD_WEB_URL.TITLE';
  @Input() weburls: UrlViewModel[];
  @Output() weburlsChange = new EventEmitter();
  @Input() icon = 'add-circle-outline';
  @Input() iconColor = 'dark';

  constructor(private modalController: ModalController, private zone: NgZone) {}

  ngOnInit() {}

  async addOrEdit(index?: number) {
    const weburl = index !== undefined ? this.weburls[index] : undefined;
    const modal = await this.modalController.create({
      component: AddWebUrlModalPage,
      componentProps: { weburl }
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
    this.zone.run(() => {
      this.weburls[index] = url;
      this.weburlsChange.emit(this.weburls);
    });
  }

  addWebUrl(url: UrlViewModel) {
    this.zone.run(() => {
      if (!this.weburls) {
        this.weburls = [];
      }
      this.weburls.push(url);
      this.weburlsChange.emit(this.weburls);
    });
  }

  removeAtIndex(index: number) {
    this.zone.run(() => {
      if (this.weburls && this.weburls.length > 0) {
        this.weburls.splice(index, 1);
        this.weburlsChange.emit(this.weburls);
      }
    });
  }
}
