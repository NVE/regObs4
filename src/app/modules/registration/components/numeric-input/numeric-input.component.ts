import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NumberHelper } from '../../../../core/helpers/number-helper';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit {

  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() min: number;
  @Input() max: number;
  @Input() required = false;
  @Input() title: string;
  @Input() placeholder: string;

  @Input() decimalPlaces = 0;

  get isValid() {
    return NumberHelper.isValid(this.value, this.min, this.max, this.required, this.decimalPlaces === 0);
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

  valueChanged() {
    this.valueChange.emit(this.value);
  }

  getValue() {
    if (this.value !== undefined && this.isValid) {
      return NumberHelper.setDecimalPlaces(this.value, this.decimalPlaces);
    } else {
      return undefined;
    }
  }

}
