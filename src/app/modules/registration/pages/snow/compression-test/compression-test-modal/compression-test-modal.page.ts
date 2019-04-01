import { Component, OnInit, Input, ViewChildren, QueryList, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompressionTestDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { NumericInputComponent } from '../../../../components/numeric-input/numeric-input.component';

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss'],
})
export class CompressionTestModalPage implements OnInit {

  @Input() compressionTest: CompressionTestDto;
  @ViewChildren(NumericInputComponent) private numericInputs: QueryList<NumericInputComponent>;

  isNew = false;
  compressionTestCopy: CompressionTestDto;
  tapsArray = [];
  isValid = true;

  constructor(private modalController: ModalController, private ngZone: NgZone) { }

  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      this.tapsArray.push(i);
    }
    if (this.compressionTest) {
      this.compressionTestCopy = { ...this.compressionTest };
    } else {
      this.compressionTestCopy = {};
      this.isNew = true;
    }
  }

  tapsFractureVisible() {
    return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT());
  }

  valueChanged() {
    this.ngZone.run(() => {
      this.isValid = this.numericInputs && !this.numericInputs.some((x) => !x.isValid);
    });
  }

  isCTNorECTX() {
    return this.compressionTestCopy.PropagationTID === 15 || this.compressionTestCopy.PropagationTID === 24;
  }

  isCTVorECTV() {
    return this.compressionTestCopy.PropagationTID === 11 || this.compressionTestCopy.PropagationTID === 21;
  }

  isLBT() {
    return this.compressionTestCopy.PropagationTID === 5;
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(IsEmptyHelper.isEmpty(this.compressionTestCopy) ? null : this.compressionTestCopy);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

}
