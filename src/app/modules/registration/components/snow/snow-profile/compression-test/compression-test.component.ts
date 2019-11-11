import { Component, OnInit, Input } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { ModalController } from '@ionic/angular';
import { IRegistration } from '../../../../models/registration.model';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss']
})
export class CompressionTestComponent implements OnInit {

  @Input() reg: IRegistration;
  private compressionTestListModal: HTMLIonModalElement;

  get connectedTests() {
    return this.tests.filter((t) => t.IncludeInSnowProfile === true);
  }

  get tests() {
    return this.reg.request.CompressionTest || [];
  }

  get isEmpty() {
    return this.connectedTests.length === 0;
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.compressionTestListModal) {
      this.compressionTestListModal = await this.modalContoller.create({
        component: CompressionTestListModalPage,
        componentProps: {
          regId: this.reg.id,
        }
      });
      this.compressionTestListModal.present();
      await this.compressionTestListModal.onDidDismiss();
      this.compressionTestListModal = null;
    }
  }

}
