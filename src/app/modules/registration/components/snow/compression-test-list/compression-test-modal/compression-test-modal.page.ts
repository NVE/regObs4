import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompressionTestDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { SelectOption } from '../../../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss'],
})
export class CompressionTestModalPage implements OnInit {

  @Input() compressionTest: CompressionTestDto;
  @Input() includeInSnowProfileAsDefault = false;

  showDelete = false;
  tapsArray: SelectOption[] = [];
  includeInSnowProfileDisabled = false;

  get isValid() {
    const clone = { ...this.compressionTest };
    clone.IncludeInSnowProfile = undefined;
    return !IsEmptyHelper.isEmpty(clone);
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      this.tapsArray.push({
        id: i,
        text: i.toString(),
      });
    }
    if (!this.compressionTest) {
      this.compressionTest = {};
      if (this.includeInSnowProfileAsDefault) {
        this.compressionTest.IncludeInSnowProfile = true;
      }
    } else {
      this.showDelete = true;
    }
    this.checkIfIncludeInSnowProfileShouldBeDisabled();
  }

  checkIfIncludeInSnowProfileShouldBeDisabled() {
    if (this.isLBT()) {
      this.compressionTest.IncludeInSnowProfile = false;
      this.includeInSnowProfileDisabled = true;
      return;
    }
    this.includeInSnowProfileDisabled = false;
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
