import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WaterLevelMeasurementEditModel } from 'src/app/modules/common-regobs-api/models';
import moment from 'moment';
import { RegistrationTid, WaterLevelMeasurementUploadModel } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { isEmpty, uuidv4 } from 'src/app/modules/common-core/helpers';

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

  ref: WaterLevelMeasurementUploadModel['ref'];

  get dateIsDifferentThanObsTime() {
    return (
      this.waterLevelMeasurement.DtMeasurementTime &&
      !moment(this.waterLevelMeasurement.DtMeasurementTime).startOf('day').isSame(moment(this.dtObsTime).startOf('day'))
    );
  }

  get isValid() {
    if (isEmpty(this.waterLevelMeasurement)) {
      return true;
    }
    return this.waterLevelMeasurement.DtMeasurementTime;
  }

  ngOnInit() {
    this.maxDate = this.getMaxDateForNow();

    //quick fix to avoid submitting measurements without mandatory fields, which can happen if you only add images
    this.setToNow();

    if (!this.waterLevelMeasurement.Attachments) {
      this.waterLevelMeasurement.Attachments = [];
    }

    // Ref is used to attach each image to a measurement later, after we upload the images to regobs.
    // See addWaterLevelAttachment in attachmentHelpers.ts
    const uploadModel = this.waterLevelMeasurement as WaterLevelMeasurementUploadModel;
    if (uploadModel.ref == null) {
      uploadModel.ref = uuidv4();
    }
    this.ref = uploadModel.ref;
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
    if (!isEmpty(this.waterLevelMeasurement) && !this.waterLevelMeasurement.DtMeasurementTime) {
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
