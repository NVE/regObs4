import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UrlEditModel } from '@varsom-regobs-common/regobs-api';

@Component({
  selector: 'app-add-web-url-modal',
  templateUrl: './add-web-url-modal.page.html',
  styleUrls: ['./add-web-url-modal.page.scss']
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
