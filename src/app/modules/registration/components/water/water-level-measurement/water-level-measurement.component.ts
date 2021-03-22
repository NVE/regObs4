import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WaterLevelMeasurementEditModel } from '@varsom-regobs-common/regobs-api';
import moment from 'moment';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { GeoHazard, isEmpty } from '@varsom-regobs-common/core';

@Component({
  selector: 'app-water-level-measurement',
  templateUrl: './water-level-measurement.component.html',
  styleUrls: ['./water-level-measurement.component.scss']
})
export class WaterLevelMeasurementComponent implements OnInit {
  @Input() measurementNumber: number;
  @Input() waterLevelMethod: number;
  @Input() registrationTid: RegistrationTid;
  @Input() registrationId: string;
  @Input() geoHazard: GeoHazard;
  @Input() dtObsTime: string;
  @Input() waterLevelMeasurement: WaterLevelMeasurementEditModel;
  @Output() waterLevelMeasurementChange = new EventEmitter();
  maxDate: string;
  showDtMeasurementTimeError = false;

  get dateIsDifferentThanObsTime() {
    return (
      this.waterLevelMeasurement.DtMeasurementTime &&
      !moment(this.waterLevelMeasurement.DtMeasurementTime)
        .startOf('day')
        .isSame(moment(this.dtObsTime).startOf('day'))
    );
  }

  get isValid() {
    if (isEmpty(this.waterLevelMeasurement)) {
      return true;
    }
    return this.waterLevelMeasurement.DtMeasurementTime;
  }

  constructor() {}

  ngOnInit() {
    this.maxDate = this.getMaxDateForNow();
    if (!this.waterLevelMeasurement.Attachments) {
      this.waterLevelMeasurement.Attachments = [];
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
    if (
      !isEmpty(this.waterLevelMeasurement) &&
      !this.waterLevelMeasurement.DtMeasurementTime
    ) {
      this.showDtMeasurementTimeError = true;
    } else {
      this.showDtMeasurementTimeError = false;
    }
  }

  dtChanged() {
    this.showError();
  }

  // triggerChange() {
  //   this.waterLevelMeasurementChange.emit(this.waterLevelMeasurement);
  // }
}
