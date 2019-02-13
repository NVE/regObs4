import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NumberHelper } from '../../../../core/helpers/number-helper';
import { Platform, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit, OnChanges {

  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() min: number;
  @Input() max: number;
  @Input() required = false;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() convertMetersToCm = false;

  @Input() decimalPlaces = 0;

  @ViewChild(IonInput) input: IonInput;

  localValue: number;
  skipNextChange = false;

  get isValid() {
    return NumberHelper.isValid(this.localValue, this.min, this.max, this.required, this.decimalPlaces === 0);
  }

  get inputmode() {
    return this.platform.is('ios') && this.decimalPlaces > 0 ? 'tel' : 'number';
  }

  get pattern() {
    return this.platform.is('ios') && this.decimalPlaces === 0 ? '[0-9]*' : undefined;
  }

  constructor(private platform: Platform) {
  }

  ngOnInit() {
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (this.skipNextChange) {
      this.skipNextChange = false;
      return;
    }
    if (simpleChange.value && simpleChange.value.currentValue !== undefined) {
      this.localValue = this.convertMetersToCm ?
        this.convertMtoCM(simpleChange.value.currentValue) : simpleChange.value.currentValue;
      this.localValue = NumberHelper.setDecimalPlaces(this.localValue, this.decimalPlaces);
    }
  }

  valueChanged() {
    if (!NumberHelper.isNullOrEmpty(this.localValue)) {
      if (this.convertMetersToCm) {
        this.value = NumberHelper.setDecimalPlaces(this.convertCMtoM(this.localValue), this.decimalPlaces + 2);
      } else {
        this.value = NumberHelper.setDecimalPlaces(this.localValue, this.decimalPlaces);
      }
    } else {
      this.value = undefined;
    }
    this.skipNextChange = true;
    this.valueChange.emit(this.value);
  }

  onBlur() {
    this.localValue = NumberHelper.setDecimalPlaces(this.localValue, this.decimalPlaces);
    this.input.value = NumberHelper.isNullOrEmpty(this.localValue) ? '' : this.localValue.toString();
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
