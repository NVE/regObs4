import { Component, inject, input, model, computed } from '@angular/core';
import { NumericInputModalPage } from '../../pages/modal-pages/numeric-input-modal/numeric-input-modal.page';
import { IonInput, IonItem, IonLabel, IonText, ModalController, Platform } from '@ionic/angular/standalone';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

const convert = (direction: 'from' | 'to', convertRatio?: number, val?: number) => {
  if (val == null || val === 0 || convertRatio == null) {
    return val;
  }
  return direction === 'from' ? val * convertRatio : val / convertRatio;
};

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
  imports: [IonItem, IonLabel, IonText, NgClass, TranslatePipe, IonInput],
})
export class NumericInputComponent {
  private modalController = inject(ModalController);

  readonly decimalPlaces = input(0);
  readonly min = input(-100000);
  readonly max = input(100000);
  readonly suffix = input<string>();
  readonly decimalSeparator = input((1.1).toLocaleString().substring(1, 2));
  readonly value = model<number>();
  readonly isValid = input(true);
  readonly errorMessage = input('');
  readonly label = input('');
  readonly placeholder = input<string>('');
  readonly convertRatio = input<number>();
  readonly readonly = input(false);
  readonly color = input('medium');
  readonly simpleObsMode = input(false);

  colorWithValidation = computed(() => (this.isValid() ? this.color() : 'danger'));

  private isOpen = false;

  valueOrPlaceholder = computed(() => this.displayValue() || this.placeholder());
  displayValue = computed(() => {
    const converted = convert('from', this.convertRatio(), this.value());
    if (converted != null) {
      const suffix = this.suffix();
      if (suffix) {
        return converted.toLocaleString() + ` ${suffix}`;
      }
      return converted.toLocaleString();
    }
    return undefined;
  });

  async openPicker() {
    if (!this.isOpen && !this.readonly()) {
      this.isOpen = true;
      const modal = await this.modalController.create({
        component: NumericInputModalPage,
        cssClass: 'numeric-input-modal',
        componentProps: {
          value: convert('from', this.convertRatio(), this.value()),
          decimalPlaces: this.decimalPlaces(),
          min: this.min(),
          max: this.max(),
          suffix: this.suffix(),
          decimalSeparator: this.decimalSeparator(),
          title: this.label(),
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      if (result.data && result.data.ok) {
        this.value.set(convert('to', this.convertRatio(), result.data.value));
      }
      this.isOpen = false;
    }
  }
}
