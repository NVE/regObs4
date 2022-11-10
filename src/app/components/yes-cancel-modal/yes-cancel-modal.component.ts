import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-yes-cancel-modal',
  templateUrl: './yes-cancel-modal.component.html',
  styleUrls: ['./yes-cancel-modal.component.scss']
})
export class YesCancelModalComponent {

  @Input() ok: () => void;
  @Input() delete: () => void;
  @Input() cancel: () => void;
  @Input() showDelete = false;
  @Input() loaded = false;

  constructor(private modalController: ModalController) {
  }

  async _ok() {
    await this.modalController.dismiss();
    this.ok();
  }

  async _delete() {
    await this.modalController.dismiss();
    this.delete();
  }

  async _cancel() {
    await this.modalController.dismiss();
    this.cancel();
  }
}
