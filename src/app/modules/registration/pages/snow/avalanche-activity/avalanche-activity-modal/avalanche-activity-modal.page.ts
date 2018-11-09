import { Component, OnInit, Input } from '@angular/core';
import { AvalancheActivityObs2Dto } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { KdvService } from '../../../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../../../core/services/user-setting/user-setting.service';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import * as moment from 'moment';
import { settings } from '../../../../../../../settings';

@Component({
  selector: 'app-avalanche-activity-modal',
  templateUrl: './avalanche-activity-modal.page.html',
  styleUrls: ['./avalanche-activity-modal.page.scss'],
})
export class AvalancheActivityModalPage implements OnInit {

  @Input() avalancheActivity: AvalancheActivityObs2Dto;

  avalancheActivityCopy: AvalancheActivityObs2Dto;
  isNew = false;

  get noAvalancheActivity() {
    return this.avalancheActivityCopy.EstimatedNumTID === 1;
  }

  set noAvalancheActivity(val: boolean) {
    if (val) {
      this.avalancheActivityCopy.EstimatedNumTID = 1;
    } else {
      this.avalancheActivityCopy.EstimatedNumTID = undefined;
    }
  }

  timeFrames = [
    {
      id: 1,
      start: { h: 0, m: 0 },
      end: { h: 23, m: 59 },
      text: 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DURING_THE_DAY',
    },
    {
      id: 2,
      start: { h: 0, m: 0 },
      end: { h: 6, m: 0 },
      text: '0-6',
    },
    {
      id: 3,
      start: { h: 6, m: 0 },
      end: { h: 12, m: 0 },
      text: '6-12'
    },
    {
      id: 4,
      start: { h: 12, m: 0 },
      end: { h: 18, m: 0 },
      text: '12-18'
    },
    {
      id: 5,
      start: { h: 18, m: 0 },
      end: { h: 23, m: 59 },
      text: '18-24'
    }
  ];

  selectedTimeFrame = 1;
  startDate: string;

  constructor(
    private modalController: ModalController,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
  ) { }

  async ngOnInit() {
    // const userSetting = await this.userSettingService.getUserSettings();
    // const snowCauseAttributesKdvElements =
    //   await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, 'Snow_AvalCauseAttributeFlags');
    if (this.avalancheActivity) {
      this.avalancheActivityCopy = { ...this.avalancheActivity };
    } else {
      this.avalancheActivityCopy = {};
      this.isNew = true;
    }
    if (this.avalancheActivityCopy.DtStart && this.avalancheActivityCopy.DtEnd) {
      const start = moment(this.avalancheActivityCopy.DtStart);
      const end = moment(this.avalancheActivityCopy.DtEnd);
      this.startDate = moment(this.avalancheActivityCopy.DtStart).startOf('day').toISOString(true);
      const timeFrame = this.timeFrames.find((tf) => tf.start.h === start.hours() && tf.end.h === end.hours()
        && tf.start.m === start.minutes() && tf.end.m === end.minutes());
      if (timeFrame) {
        this.selectedTimeFrame = timeFrame.id;
      }
    } else {
      this.startDate = moment().startOf('day').toISOString(true);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    const timeFrame = this.timeFrames.find((tf) => tf.id === this.selectedTimeFrame);
    if (this.startDate && timeFrame) {
      this.avalancheActivityCopy.DtStart = moment(this.startDate).hours(timeFrame.start.h).minutes(timeFrame.start.m).toISOString(true);
      this.avalancheActivityCopy.DtEnd = moment(this.startDate).hours(timeFrame.end.h).minutes(timeFrame.end.m).toISOString(true);
    }
    if (this.isNew && IsEmptyHelper.isEmpty(this.avalancheActivityCopy)) {
      this.modalController.dismiss(null);
    } else {
      this.modalController.dismiss(this.avalancheActivityCopy);
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
