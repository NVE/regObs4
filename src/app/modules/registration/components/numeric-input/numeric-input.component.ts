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
  private skipNextChange = false;

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
    if (!simpleChange.value.currentValue) {
      this.localValue = undefined;
      return;
    }
    this.localValue = NumberHelper.setDecimalPlaces(this.convertMetersToCm ?
      this.convertMtoCM(simpleChange.value.currentValue) : simpleChange.value.currentValue,
      this.decimalPlaces);
  }

  valueChanged() {
    if (!NumberHelper.isNullOrEmpty(this.localValue)) {
      this.changeValueButSkipNgOnChanges(this.convertMetersToCm ?
        NumberHelper.setDecimalPlaces(this.convertCMtoM(this.localValue), this.decimalPlaces + 2) :
        NumberHelper.setDecimalPlaces(this.localValue, this.decimalPlaces)
      );
      return;
    }
    this.changeValueButSkipNgOnChanges(undefined);
  }

  private changeValueButSkipNgOnChanges(val: number) {
    this.skipNextChange = true;
    this.value = val;
    this.valueChange.emit(this.value);
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
