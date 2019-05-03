import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NumericInputModalPage } from '../../pages/modal-pages/numeric-input-modal/numeric-input-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit {
  @Input() decimalPlaces = 0;
  @Input() min = -100000;
  @Input() max = 100000;
  @Input() suffix: string;
  @Input() decimalSeparator;
  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() title: string;
  @Input() placeholder: string;
  @Input() convertMetersToCm = false;

  private isOpen = false;

  get displayValue() {
    if (this.value !== undefined) {
      return (this.convertMetersToCm ? this.convertMtoCM(this.value) : this.value).toLocaleString();
    }
    return undefined;
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openPicker() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalController.create({
        component: NumericInputModalPage,
        cssClass: 'numeric-input-modal',
        componentProps: {
          value: this.convertMetersToCm ? this.convertMtoCM(this.value) : this.value,
          decimalPlaces: this.decimalPlaces,
          min: this.min,
          max: this.max,
          suffix: this.suffix,
          decimalSeparator: this.decimalSeparator,
          title: this.title,
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      if (result.data && result.data.ok) {
        this.value = this.convertMetersToCm ? this.convertCMtoM(result.data.value) : result.data.value;
        this.valueChange.emit(this.value);
      }
      this.isOpen = false;
    }
  }

  private convertMtoCM(val: number) {
    if (val === undefined || val === null) {
      return val;
    }
    return val * 100.0;
  }

  private convertCMtoM(val: number) {
    if (val === undefined || val === null) {
      return val;
    }
    return val / 100.0;
  }

}
