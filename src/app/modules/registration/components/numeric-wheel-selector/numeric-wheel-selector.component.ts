import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PickerOptions, PickerColumn, PickerColumnOption } from '@ionic/core';
import { PickerController } from '@ionic/angular';

const digitColumnName = 'digit';
const decimalColumnName = 'decimal';

@Component({
  selector: 'app-numeric-wheel-selector',
  templateUrl: './numeric-wheel-selector.component.html',
  styleUrls: ['./numeric-wheel-selector.component.scss']
})
export class NumericWheelSelectorComponent implements OnInit {
  @Input() decimalDigits = 0;
  @Input() digits = 3;
  @Input() allowNegativeValues = false;
  @Input() decimalSeparator;
  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() title: string;
  @Input() placeholder: string;

  constructor(private pickerController: PickerController) { }

  ngOnInit() {
  }

  private getOptions(): PickerOptions {
    return {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (data) => this.setValue(data),
        },
      ],
      cssClass: 'numeric-wheel-picker',
      columns: this.getColumns(),
    };
  }

  async openPicker() {
    const picker = await this.pickerController.create(this.getOptions());
    await picker.present();
  }

  setValue(data: any) {
    let valAsString = this.getDigitAsString(data, this.digits, digitColumnName);
    if (this.decimalDigits > 0) {
      valAsString += '.';
      valAsString += this.getDigitAsString(data, this.decimalDigits, decimalColumnName);
    }
    if (data.signed && data.signed.value === '-') {
      valAsString = '-' + valAsString;
    }
    this.value = parseFloat(valAsString);
    this.valueChange.emit(this.value);
  }

  private getDigitColumnName(n: number) {
    return this.getColumnName(digitColumnName, n);
  }

  private getDecimalColumnName(n: number) {
    return this.getColumnName(decimalColumnName, n);
  }

  private getColumnName(prefix: string, n: number) {
    return `${prefix}_${n}`;
  }

  private getDigitAsString(data: any, n: number, prefix: string) {
    let valAsString = '';
    for (let i = 0; i < n; i++) {
      const columnName = this.getColumnName(prefix, i);
      const value = data[columnName].value;
      valAsString += value;
    }
    return valAsString;
  }

  private getNumberArray(n: number) {
    return Array.from(Array(n), (_, i) => i + 1);
  }

  private getNumberOptions(selectedNum: number): PickerColumnOption[] {
    return this.getNumberArray(10).map((_, index) => <PickerColumnOption>({
      text: index.toString(),
      value: index,
      selected: index === selectedNum,
    }));
  }

  private getColumns() {
    return [...this.getPositiveNegativeColumn(), ...this.getDigitColumns(), ...this.getDecimalColumns()];
  }

  private getDigitColumns(): PickerColumn[] {
    return this.getNumberArray(this.digits)
      .map((_, index) => {
        const selectedNumber = this.getSelectedDigitIndex(index);
        const pickerColumn: PickerColumn = {
          name: this.getDigitColumnName(index),
          options: this.getNumberOptions(selectedNumber),
          selectedIndex: selectedNumber,
        };
        return pickerColumn;
      });
  }

  private getSelectedDigitIndex(i: number) {
    if (this.value === undefined) {
      return 0;
    }
    const formattedValue = (this.value > 0 ? this.value : this.value * -1).toFixed(0).padStart(this.digits, '0');
    return parseInt(formattedValue.substr(i, 1), 10);
  }

  private getSelectedNumberForDecimalIndex(i: number) {
    if (this.value === undefined) {
      return 0;
    }
    const formattedValue = this.value.toFixed(this.decimalDigits);
    const decimalValues = formattedValue.substr(formattedValue.indexOf('.') + 1);
    return parseInt(decimalValues.substr(i, 1), 10);
  }

  private getDecimalColumns(): PickerColumn[] {
    return this.getNumberArray(this.decimalDigits)
      .map((_, index) => {
        const selectedNumber = this.getSelectedNumberForDecimalIndex(index);
        const pickerColumn: PickerColumn = {
          name: this.getDecimalColumnName(index),
          options: this.getNumberOptions(selectedNumber),
          prefix: index === 0 ? '.' : null,
          selectedIndex: selectedNumber,
        };
        return pickerColumn;
      });
  }

  private getPositiveNegativeColumn(): PickerColumn[] {
    if (!this.allowNegativeValues) {
      return [];
    }
    const positive = (this.value === undefined || this.value >= 0);
    return [{
      name: 'signed',
      options: [{
        text: '+',
        value: '+',
        selected: positive,
      },
      {
        text: '-',
        value: '-',
        selected: !positive,
      }],
      selectedIndex: positive ? 0 : 1
    }];
  }

}
