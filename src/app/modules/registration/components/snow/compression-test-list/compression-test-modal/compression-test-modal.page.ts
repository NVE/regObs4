import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToggle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { SelectOption } from '../../../../../shared/components/input/select/select-option.model';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../../../../shared/components/input/select/select.component';
import { NumericInputComponent } from '../../../numeric-input/numeric-input.component';
import { TextCommentComponent } from '../../../text-comment/text-comment.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';
import { isEmpty } from 'src/app/modules/common-core/helpers';

enum Propagation {
  NotGiven = 0,
  LBT = 5,

  // CT
  CTV = 11,
  CTE = 12,
  CTM = 13,
  CTH = 14,
  CTN = 15,

  // ECT
  ECTPV = 21,
  ECTP = 22,
  ECTN = 23,
  ECTX = 24,

  // PST
  PSTEnd = 31,
  PSTSF = 32,
  PSTArr = 33,

  RB = 41,
}

@Component({
  selector: 'app-compression-test-modal',
  templateUrl: './compression-test-modal.page.html',
  styleUrls: ['./compression-test-modal.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToggle,
    IonToolbar,
    KdvSelectComponent,
    ModalSaveOrDeleteButtonsComponent,
    NgIf,
    NumericInputComponent,
    SelectComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class CompressionTestModalPage {
  private modalController = inject(ModalController);

  readonly compressionTest = input<CompressionTestEditModel>();
  readonly includeInSnowProfileAsDefault = input(false); // Modalen kan også brukes fra snøprofil, da er denne true

  // Form
  propagationTid = linkedSignal(() => this.compressionTest()?.PropagationTID);
  tapsFracture = linkedSignal(() => this.compressionTest()?.TapsFracture);
  fractureDepth = linkedSignal(() => this.compressionTest()?.FractureDepth);
  pstX = linkedSignal(() => this.compressionTest()?.PstX);
  pstY = linkedSignal(() => this.compressionTest()?.PstY);
  rbRelease = linkedSignal(() => this.compressionTest()?.RbRelease);
  comprTestFractureTid = linkedSignal(() => this.compressionTest()?.ComprTestFractureTID);
  stabilityEvalTid = linkedSignal(() => this.compressionTest()?.StabilityEvalTID);
  comment = linkedSignal(() => this.compressionTest()?.Comment);

  isCTNorECTX = computed(() => {
    return this.propagationTid() === Propagation.CTN || this.propagationTid() === Propagation.ECTX;
  });
  isCTNorECTXorRB7 = computed(() => {
    return this.isCTNorECTX() || (this.isRB() && this.tapsFracture() == 7);
  });
  isCTVorECTV = computed(() => {
    return this.propagationTid() === Propagation.CTV || this.propagationTid() === Propagation.ECTPV;
  });
  isLBT = computed(() => {
    return this.propagationTid() === Propagation.LBT;
  });
  isPST = computed(() => {
    return [Propagation.PSTEnd, Propagation.PSTSF, Propagation.PSTArr].includes(this.propagationTid() as Propagation);
  });
  isCTE = computed(() => this.propagationTid() === Propagation.CTE);
  isCTM = computed(() => this.propagationTid() === Propagation.CTM);
  isCTH = computed(() => this.propagationTid() === Propagation.CTH);
  isRB = computed(() => this.propagationTid() === Propagation.RB);

  includeInSnowProfile = linkedSignal(() => {
    if (this.isLBT()) {
      return false;
    }
    const include = this.compressionTest()?.IncludeInSnowProfile;
    if (include != null) {
      return include;
    }
    return this.includeInSnowProfileAsDefault();
  });

  tapsFractureVisible = computed(() => {
    return !(this.isCTNorECTX() || this.isCTVorECTV() || this.isLBT() || this.isPST() || this.propagationTid() == null);
  });

  testFractureVisible = computed(() => {
    return !this.isCTNorECTXorRB7() && !this.isPST() && !this.isRB() && this.propagationTid() != null;
  });

  tapsArray = computed(() => {
    if (this.isCTE()) {
      return getTaps(1, 11);
    }
    if (this.isCTM()) {
      return getTaps(11, 21);
    }
    if (this.isCTH()) {
      return getTaps(21, 31);
    }
    if (this.isRB()) {
      return getTaps(1, 8);
    }
    return getTaps(1, 31);
  });

  formValue = computed<CompressionTestEditModel>(() => {
    return {
      Comment: this.comment(),
      ComprTestFractureTID: this.comprTestFractureTid(),
      // CompressionTestTID: this.compressionTest()?.CompressionTestTID,
      FractureDepth: this.fractureDepth(),
      IncludeInSnowProfile: this.includeInSnowProfile(),
      PropagationTID: this.propagationTid(),
      PstX: this.pstX(),
      PstY: this.pstY(),
      RbRelease: this.rbRelease(),
      StabilityEvalTID: this.stabilityEvalTid(),
      TapsFracture: this.tapsFracture(),
    };
  });

  showDelete = computed(() => !isEmpty(this.compressionTest()));

  isValid = computed(() => {
    const clone = { ...this.formValue() };
    clone.IncludeInSnowProfile = undefined;
    return !isEmpty(clone);
  });

  rbReleaseVisible = computed(() => {
    const taps = this.tapsFracture();
    return this.isRB() && taps != null && taps < 7;
  });

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.formValue());
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}

function getTaps(from: number, to: number): SelectOption[] {
  return [...Array(to).keys()].slice(from, to).map((k) => {
    return { id: k, text: k.toString() };
  });
}
