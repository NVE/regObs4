import { Component, OnInit, Input } from '@angular/core';
import { CompressionTestDto } from '../../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compression-test-list-modal',
  templateUrl: './compression-test-list-modal.page.html',
  styleUrls: ['./compression-test-list-modal.page.scss'],
})
export class CompressionTestListModalPage implements OnInit {

  @Input() tests: Array<CompressionTestDto>;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  ok() {
    this.modalController.dismiss(this.tests);
  }

  cancel() {
    this.modalController.dismiss();
  }

}
