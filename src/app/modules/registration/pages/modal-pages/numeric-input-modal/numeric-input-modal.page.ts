import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NumberHelper } from '../../../../../core/helpers/number-helper';

@Component({
  selector: 'app-numeric-input-modal',
  templateUrl: './numeric-input-modal.page.html',
  styleUrls: ['./numeric-input-modal.page.scss']
})
export class NumericInputModalPage implements OnInit {
  @Input() value: number;
  @Input() suffix: string;
  @Input() min = -100000;
  @Input() max = 100000;
  @Input() decimalPlaces = 0;
  @Input() decimalSeparator;
  @Input() title: string;

  decimalSep = '.';
  isNegative = false;
  private numbers: Array<string> = [];

  get textVal() {
    return this.numbers.join('');
  }

  get localeString() {
    return this.textVal.replace('.', this.decimalSep);
  }

  get numberVal() {
    const num = parseFloat(this.textVal);
    if (isNaN(num)) {
      return undefined;
    }
    return parseFloat(this.textVal) * (this.isNegative ? -1 : 1);
  }

  constructor(private modalController: ModalController) {}

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

  ngOnInit() {
    if (this.value !== undefined) {
      this.isNegative = this.value < 0;
      const positiveValue = this.value * (this.isNegative ? -1 : 1);
      this.numbers = NumberHelper.setDecimalPlaces(
        positiveValue,
        this.decimalPlaces
      )
        .toString(10)
        .split('');
    }
    if (this.max !== undefined && this.max <= 0) {
      this.isNegative = true;
    }
    this.decimalSep =
      this.decimalSeparator !== undefined
        ? this.decimalSeparator
        : this.getDecimalSeparatorForBrowser();
  }

  private getDecimalSeparatorForBrowser() {
    return (1.1).toLocaleString().substring(1, 2);
  }

  cancel() {
    this.modalController.dismiss();
  }

  done() {
    this.modalController.dismiss({
      ok: true,
      value: this.numberVal
    });
  }

  toggleNegative() {
    if (this.max !== undefined && this.max <= 0) {
      return;
    }
    this.isNegative = !this.isNegative;
  }

  private getNumberOfDecimals() {
    let isDecimal = false;
    let result = 0;
    for (const i of this.numbers) {
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
    if (
      this.decimalPlaces > 0 &&
      this.getNumberOfDecimals() >= this.decimalPlaces
    ) {
      return;
    }

    this.numbers.push(val);
    if (
      (this.max !== undefined && this.numberVal > this.max) ||
      (this.min !== undefined && this.numberVal < this.min)
    ) {
      this.numbers.pop();
    }
  }

  pushDecimalSeparator() {
    if (this.numbers.indexOf('.') < 0) {
      this.numbers.push('.');
    }
  }

  clear() {
    this.numbers.pop();
  }
}
