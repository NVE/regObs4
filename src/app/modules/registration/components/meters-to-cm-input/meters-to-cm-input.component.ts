import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NumberHelper } from '../../../../core/helpers/number-helper';
import { IonInput } from '@ionic/angular';

export const DEFAULT_PATTERN = '[0-9]*';
export const DECIMAPL_PLACE_PATTERN = '[0-9]+([,\.][0-9]+)?';

@Component({
  selector: 'app-meters-to-cm-input',
  templateUrl: './meters-to-cm-input.component.html',
  styleUrls: ['./meters-to-cm-input.component.scss']
})
export class MetersToCmInputComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder: string;
  @Input() value: number;
  @Output() valueChange = new EventEmitter();
  @Input() decimalPlaces = 0;

  cmValue: number;
  pattern: string;

  @ViewChild(IonInput) input: IonInput;

  constructor() { }

  ngOnInit() {
    this.pattern = this.decimalPlaces > 0 ? DECIMAPL_PLACE_PATTERN : DEFAULT_PATTERN;
  }
  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.value) {
      this.cmValue = NumberHelper.setDecimalPlaces(this.convertMtoCM(simpleChange.value.currentValue), this.decimalPlaces);
    }
  }

  onInputChange() {
    if (this.cmValue === null || this.cmValue === undefined) {
      this.value = this.cmValue;
    } else {
      if (this.min && this.cmValue < this.min) {
        this.cmValue = this.min;
      }
      if (this.max && this.cmValue > this.max) {
        this.cmValue = this.max;
      }
      this.cmValue = NumberHelper.setDecimalPlaces(this.cmValue, this.decimalPlaces);
      this.value = NumberHelper.setDecimalPlaces(this.convertCMtoM(this.cmValue), this.decimalPlaces + 2);
      this.input.value = this.cmValue.toString();
    }
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
