import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChildren, QueryList } from '@angular/core';
import { WaterLevelMeasurementDto } from '../../../../regobs-api/models';
import * as moment from 'moment';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { NumericInputComponent } from '../../numeric-input/numeric-input.component';

@Component({
  selector: 'app-water-level-measurement',
  templateUrl: './water-level-measurement.component.html',
  styleUrls: ['./water-level-measurement.component.scss']
})
export class WaterLevelMeasurementComponent implements OnInit {
  @Input() measurementNumber: number;
  @Input() waterLevelMethod: number;
  @Input() registrationTid: RegistrationTid;
  @Input() waterLevelMeasurement: WaterLevelMeasurementDto;
  @Input() dtObsTime: string;
  @Output() waterLevelMeasurementChange = new EventEmitter();

  maxDate: string;
  @ViewChildren(NumericInputComponent) private numericInputs: QueryList<NumericInputComponent>;

  get dateIsDifferentThanObsTime() {
    return this.waterLevelMeasurement.DtMeasurementTime
      && !moment(this.waterLevelMeasurement.DtMeasurementTime)
        .startOf('day').isSame(moment(this.dtObsTime).startOf('day'));
  }

  get isValid() {
    return this.numericInputs && !this.numericInputs.some((x) => !x.isValid);
  }

  constructor() { }

  ngOnInit() {
    this.maxDate = moment().toISOString(true);
    if (!this.waterLevelMeasurement.Pictures) {
      this.waterLevelMeasurement.Pictures = [];
    }
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = now;
    this.waterLevelMeasurement.DtMeasurementTime = now;
  }
}
