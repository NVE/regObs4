import { Component, HostListener, inject, input, linkedSignal, computed } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NumberHelper } from '../../../../../core/helpers/number-helper';
import { NgIf, NgFor } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-numeric-input-modal',
  templateUrl: './numeric-input-modal.page.html',
  styleUrls: ['./numeric-input-modal.page.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    NgFor,
    NgIf,
    TranslatePipe,
  ],
})
export class NumericInputModalPage {
  private modalController = inject(ModalController);

  readonly value = input<number>();
  readonly suffix = input<string>();
  readonly min = input(-100000);
  readonly max = input(100000);
  readonly decimalPlaces = input(0);
  readonly decimalSeparator = input(',');
  readonly title = input<string>();

  isNegative = linkedSignal(() => {
    const value = this.value();
    if (value == null) {
      return this.max() <= 0;
    }
    return value < 0;
  });

  numbers = linkedSignal(() => {
    const value = this.value();
    if (value == null) {
      return [] as string[];
    }
    return NumberHelper.setDecimalPlaces(Math.abs(value), this.decimalPlaces()).toString(10).split('');
  });

  localeString = computed(() => {
    const value = toTextValue(this.numbers()).replace('.', this.decimalSeparator());
    const suffix = this.suffix();
    if (value && suffix) {
      return `${value} ${suffix}`;
    }
    return value;
  });

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key.match('[0-9]')) {
      this.pushNumber(event.key);
    }
    if (event.key.match('[,.]')) {
      this.pushDecimalSeparator();
    }
    if (event.keyCode === 13) {
      // Enter click
      this.done();
    }
    if (event.keyCode === 8) {
      // Backspace
      this.clear();
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  done() {
    this.modalController.dismiss({
      ok: true,
      value: asNumber(toTextValue(this.numbers()), this.isNegative()),
    });
  }

  toggleNegative() {
    const max = this.max();
    if (max !== undefined && max <= 0) {
      return;
    }
    this.isNegative.update((v) => !v);
  }

  private getNumberOfDecimals() {
    let isDecimal = false;
    let result = 0;
    for (const i of this.numbers()) {
      if (isDecimal) {
        result++;
      } else {
        if (i === '.') {
          isDecimal = true;
        }
      }
    }
    return result;
  }

  pushNumber(val: string) {
    const decimalPlaces = this.decimalPlaces();
    if (decimalPlaces > 0 && this.getNumberOfDecimals() >= decimalPlaces) {
      return;
    }

    this.numbers.update((values) => {
      const updated = [...values, val];
      const numberValue = asNumber(toTextValue(updated), this.isNegative());

      // If invalid number after update, do not update
      if (numberValue == null) {
        return values;
      }

      // Do not update if above / below max / min
      if (numberValue > this.max() || numberValue < this.min()) {
        return values;
      }

      return updated;
    });
  }

  pushDecimalSeparator() {
    if (this.numbers().indexOf('.') < 0) {
      this.numbers.update((values) => [...values, '.']);
    }
  }

  clear() {
    this.numbers.update((values) => values.slice(0, -1));
  }
}

function asNumber(value: string, isNegative: boolean) {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return undefined;
  }
  return num * (isNegative ? -1 : 1);
}

function toTextValue(numbers: string[]) {
  return numbers.join('');
}
