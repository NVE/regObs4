import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { SelectOption } from '../../../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss']
})
export class CompressionTestModalPage implements OnInit {
  @Input() compressionTest: CompressionTestEditModel;
  @Input() includeInSnowProfileAsDefault = false;

  showDelete = false;
  tapsArray: SelectOption[] = [];
  includeInSnowProfileDisabled = false;

  get isValid() {
    const clone = { ...this.compressionTest };
    clone.IncludeInSnowProfile = undefined;
    return !IsEmptyHelper.isEmpty(clone);
  }

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.tapsArray = this.getTaps(1, 31);
    if (!this.compressionTest) {
      this.compressionTest = {};
      if (this.includeInSnowProfileAsDefault) {
        this.compressionTest.IncludeInSnowProfile = true;
      }
    } else {
      this.showDelete = true;
    }
    this.checkTestType();
  }

  checkTestType() {
    if (this.isLBT()) {
      this.compressionTest.IncludeInSnowProfile = false;
      this.includeInSnowProfileDisabled = true;
      return;
    }
    this.includeInSnowProfileDisabled = false;

    if (this.isCTE()) {
      this.tapsArray = this.getTaps(1, 11);
    } else if (this.isCTM()) {
      this.tapsArray = this.getTaps(11, 21);
    } else if (this.isCTH()) {
      this.tapsArray = this.getTaps(21, 31);
    } else if (this.isRB()) {
      this.tapsArray = this.getTaps(1, 8);
    } else {
      this.tapsArray = this.getTaps(1, 31);
    }
  }

  tapsFractureVisible() {
    return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT() || this.isPST() || this.isNull());
  }

  testFractureVisible() {
    return !this.isCTNorECTXorRB7() && !this.isPST() && !this.isNull() && !this.isRB();
  }

  rbReleaseVisible() {
    return this.isRB() && this.compressionTest.TapsFracture && this.compressionTest.TapsFracture < 7;
  }

  isCTNorECTX() {
    return (
      this.compressionTest.PropagationTID === 15 ||
      this.compressionTest.PropagationTID === 24
    );
  }

  isCTNorECTXorRB7() {
    return (
      this.isCTNorECTX() ||
      (this.compressionTest.PropagationTID == 41 && this.compressionTest.TapsFracture == 7)
    );
  }

  isCTVorECTV() {
    return (
      this.compressionTest.PropagationTID === 11 ||
      this.compressionTest.PropagationTID === 21
    );
  }

  isLBT() {
    return this.compressionTest.PropagationTID === 5;
  }

  isNull() {
    return !this.compressionTest.PropagationTID;
  }

  isPST() {
    const tid = this.compressionTest.PropagationTID;
    return 30 <= tid && tid < 40;
  }

  isCTE() {
    return this.compressionTest.PropagationTID === 12;
  }

  isCTM() {
    return this.compressionTest.PropagationTID === 13;
  }

  isCTH() {
    return this.compressionTest.PropagationTID === 14;
  }

  isRB() {
    return this.compressionTest.PropagationTID === 41;
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

  getTaps(from, to) {
    return [...Array(to).keys()]
      .slice(from, to)
      .map((k) => {return {id: k, text: k.toString()};});
  }
}
