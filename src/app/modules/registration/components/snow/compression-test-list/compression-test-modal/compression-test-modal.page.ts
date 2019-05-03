import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompressionTestDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss'],
})
export class CompressionTestModalPage implements OnInit {

  @Input() compressionTest: CompressionTestDto;
  @Input() includeInSnowProfileAsDefault = false;

  showDelete = false;
  tapsArray = [];

  get isValid() {
    const clone = { ...this.compressionTest };
    clone.IncludeInSnowProfile = undefined;
    return !IsEmptyHelper.isEmpty(clone);
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      this.tapsArray.push(i);
    }
    if (!this.compressionTest) {
      this.compressionTest = {};
      if (this.includeInSnowProfileAsDefault) {
        this.compressionTest.IncludeInSnowProfile = true;
      }
    } else {
      this.showDelete = true;
    }
  }

  tapsFractureVisible() {
    return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT());
  }

  isCTNorECTX() {
    return this.compressionTest.PropagationTID === 15 || this.compressionTest.PropagationTID === 24;
  }

  isCTVorECTV() {
    return this.compressionTest.PropagationTID === 11 || this.compressionTest.PropagationTID === 21;
  }

  isLBT() {
    return this.compressionTest.PropagationTID === 5;
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.compressionTest);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

}
