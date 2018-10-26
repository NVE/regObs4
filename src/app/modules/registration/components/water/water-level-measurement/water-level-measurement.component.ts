import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { WaterLevelMeasurementDto } from '../../../../regobs-api/models';
import * as moment from 'moment';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Output() waterLevelMeasurementChange = new EventEmitter();

  maxDate: string;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      waterLevelMethod: new FormControl('', [Validators.min(0), Validators.max(10000)]),
    });
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
