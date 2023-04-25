import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NumericInputModalPage } from '../../pages/modal-pages/numeric-input-modal/numeric-input-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
})
export class NumericInputComponent {
  @Input() decimalPlaces = 0;
  @Input() min = -100000;
  @Input() max = 100000;
  @Input() suffix: string;
  @Input() decimalSeparator;
  @Input() value: number;
  @Input() isValid = true;
  @Input() errorMessage?: string;
  @Output() valueChange = new EventEmitter();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() convertRatio: number;
  @Input() readonly = false;
  @Input() color = 'medium';
  @Input() simpleObsMode = false;

  private isOpen = false;

  get displayValue(): string {
    const converted = this.convert(this.value, 'from');
    if (converted != null) {
      return converted.toLocaleString();
    }
    return undefined;
  }

  constructor(private modalController: ModalController) {}

  async openPicker() {
    if (!this.isOpen && !this.readonly) {
      this.isOpen = true;
      const modal = await this.modalController.create({
        component: NumericInputModalPage,
        cssClass: 'numeric-input-modal',
        componentProps: {
          value: this.convert(this.value, 'from'),
          decimalPlaces: this.decimalPlaces,
          min: this.min,
          max: this.max,
          suffix: this.suffix,
          decimalSeparator: this.decimalSeparator,
          title: this.label,
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      if (result.data && result.data.ok) {
        this.value = this.convert(result.data.value, 'to');
        this.valueChange.emit(this.value);
      }
      this.isOpen = false;
    }
  }

  private convert(val: number, direction: 'from' | 'to'): number {
    if (val == null || val === 0 || this.convertRatio === undefined) {
      return val;
    }
    return direction === 'from' ? val * this.convertRatio : val / this.convertRatio;
  }
}
