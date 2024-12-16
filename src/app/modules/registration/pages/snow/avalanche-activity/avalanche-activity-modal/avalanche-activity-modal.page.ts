import { Component, OnInit, Input } from '@angular/core';
import { AvalancheActivityObs2EditModel } from 'src/app/modules/common-regobs-api/models';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import moment from 'moment';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from '../../../../../../components/datetime-picker/datetime-picker.component';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { ExposedHeightComponent } from '../../../../components/snow/exposed-height/exposed-height.component';
import { ValidExpositionComponent } from '../../../../components/snow/valid-exposition/valid-exposition.component';
import { TextCommentComponent } from '../../../../components/text-comment/text-comment.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avalanche-activity-modal',
  templateUrl: './avalanche-activity-modal.page.html',
  styleUrls: ['./avalanche-activity-modal.page.scss'],
  imports: [
    DatetimePickerComponent,
    ExposedHeightComponent,
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    ModalSaveOrDeleteButtonsComponent,
    NgClass,
    NgFor,
    NgIf,
    TextCommentComponent,
    TranslateModule,
    ValidExpositionComponent,
  ],
})
export class AvalancheActivityModalPage implements OnInit {
  @Input() avalancheActivity: AvalancheActivityObs2EditModel;
  @Input() dtObsTime: string;

  avalancheActivityCopy: AvalancheActivityObs2EditModel;
  isNew = false;
  maxDate: string;

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

  get dateIsDifferentThanObsTime() {
    return this.startDate && !moment(this.startDate).startOf('day').isSame(moment(this.dtObsTime).startOf('day'));
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
      text: '6-12',
    },
    {
      id: 4,
      start: { h: 12, m: 0 },
      end: { h: 18, m: 0 },
      text: '12-18',
    },
    {
      id: 5,
      start: { h: 18, m: 0 },
      end: { h: 23, m: 59 },
      text: '18-24',
    },
  ];

  selectedTimeFrame = 1;
  startDate: string;

  constructor(private modalController: ModalController) {}

  async ngOnInit() {
    this.maxDate = this.getMaxDateForNow();
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
      const timeFrame = this.timeFrames.find(
        (tf) =>
          tf.start.h === start.hours() &&
          tf.end.h === end.hours() &&
          tf.start.m === start.minutes() &&
          tf.end.m === end.minutes()
      );
      if (timeFrame) {
        this.selectedTimeFrame = timeFrame.id;
      }
    } else {
      this.startDate = moment(this.dtObsTime).startOf('day').toISOString(true);
    }
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  cancel() {
    this.modalController.dismiss();
  }

  private resetWhenNoActivityFields() {
    this.avalancheActivityCopy.AvalancheExtTID = undefined;
    this.avalancheActivityCopy.AvalTriggerSimpleTID = undefined;
    this.avalancheActivityCopy.DestructiveSizeTID = undefined;
    this.avalancheActivityCopy.AvalPropagationTID = undefined;
    this.avalancheActivityCopy.ExposedHeightComboTID = undefined;
    this.avalancheActivityCopy.ExposedHeight1 = undefined;
    this.avalancheActivityCopy.ExposedHeight2 = undefined;
    this.avalancheActivityCopy.ValidExposition = undefined;
  }

  ok() {
    if (this.avalancheActivityCopy.EstimatedNumTID === 1) {
      this.resetWhenNoActivityFields();
    }
    const timeFrame = this.timeFrames.find((tf) => tf.id === this.selectedTimeFrame);
    if (this.startDate && timeFrame) {
      this.avalancheActivityCopy.DtStart = moment(this.startDate)
        .hours(timeFrame.start.h)
        .minutes(timeFrame.start.m)
        .toISOString(true);
      this.avalancheActivityCopy.DtEnd = moment(this.startDate)
        .hours(timeFrame.end.h)
        .minutes(timeFrame.end.m)
        .toISOString(true);
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
