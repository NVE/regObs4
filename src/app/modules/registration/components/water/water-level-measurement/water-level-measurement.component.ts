import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WaterLevelMeasurementDto } from '../../../../regobs-api/models';
import moment from 'moment';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';

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
  showDtMeasurementTimeError = false;

  get dateIsDifferentThanObsTime() {
    return this.waterLevelMeasurement.DtMeasurementTime
      && !moment(this.waterLevelMeasurement.DtMeasurementTime)
        .startOf('day').isSame(moment(this.dtObsTime).startOf('day'));
  }

  get isValid() {
    if (IsEmptyHelper.isEmpty(this.waterLevelMeasurement)) {
      return true;
    }
    return this.waterLevelMeasurement.DtMeasurementTime;
  }

  constructor() { }

  ngOnInit() {
    this.maxDate = this.getMaxDateForNow();
    if (!this.waterLevelMeasurement.Pictures) {
      this.waterLevelMeasurement.Pictures = [];
    }
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = this.getMaxDateForNow();
    this.waterLevelMeasurement.DtMeasurementTime = now;
  }

  showError() {
    if (!IsEmptyHelper.isEmpty(this.waterLevelMeasurement) && !this.waterLevelMeasurement.DtMeasurementTime) {
      this.showDtMeasurementTimeError = true;
    } else {
      this.showDtMeasurementTimeError = false;
    }
  }

  dtChanged() {
    this.showError();
    this.triggerChange();
  }

  triggerChange() {
    this.waterLevelMeasurementChange.emit();
  }
}
