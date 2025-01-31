import { Component, computed, inject, input, linkedSignal } from '@angular/core';
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
import moment from 'moment';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from '../../../../../../components/datetime-picker/datetime-picker.component';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { ExposedHeightComponent } from '../../../../components/snow/exposed-height/exposed-height.component';
import { ValidExpositionComponent } from '../../../../components/snow/valid-exposition/valid-exposition.component';
import { TextCommentComponent } from '../../../../components/text-comment/text-comment.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';
import { isEmpty } from 'src/app/modules/common-core/helpers';

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
    NgFor,
    NgIf,
    TextCommentComponent,
    TranslatePipe,
    ValidExpositionComponent,
  ],
})
export class AvalancheActivityModalPage {
  private modalController = inject(ModalController);

  readonly inputData = input<AvalancheActivityObs2EditModel>();
  readonly dtObsTime = input.required<string>();

  // Form
  startDate = linkedSignal(() => {
    let initDate = this.inputData()?.DtStart;
    if (!initDate) {
      initDate = this.dtObsTime();
    }
    return moment(initDate).startOf('day').toISOString(true);
  });
  estimatedNumTid = linkedSignal(() => this.inputData()?.EstimatedNumTID);
  selectedTimeFrame = linkedSignal(() => this.parseTimeFrame(this.inputData()));
  avalancheExtTid = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.AvalancheExtTID;
  });
  avalTriggerSimpleTid = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.AvalTriggerSimpleTID;
  });
  destructiveSizeTid = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.DestructiveSizeTID;
  });
  avalPropagationTid = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.AvalPropagationTID;
  });
  exposedHeightComboTid = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.ExposedHeightComboTID;
  });
  exposedHeight1 = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.ExposedHeight1;
  });
  exposedHeight2 = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.ExposedHeight2;
  });
  validExposition = linkedSignal(() => {
    if (this.noAvalancheActivity()) {
      return undefined;
    }
    return this.inputData()?.ValidExposition;
  });
  comment = linkedSignal(() => this.inputData()?.Comment);

  noAvalancheActivity = computed(() => this.estimatedNumTid() === 1);
  dateIsDifferentThanObsTime = computed(() => {
    if (!this.startDate()) {
      return false; // Den er jo kanskje forskjellig da også, men tror det var sånn det funka før..
    }

    const startDay = moment(this.startDate()).startOf('day');
    const obsDay = moment(this.dtObsTime()).startOf('day');
    return startDay.isSame(obsDay);
  });

  toggleNoAvalancheActivity() {
    this.estimatedNumTid.update((tid) => (tid !== 1 ? 1 : undefined));
  }

  // avalancheActivityCopy: AvalancheActivityObs2EditModel;
  isNew = computed(() => this.inputData() == null);
  maxDate = this.getMaxDateForNow();

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

  parseTimeFrame(avalancheActivity?: AvalancheActivityObs2EditModel) {
    const start = moment(avalancheActivity?.DtStart);
    const end = moment(avalancheActivity?.DtEnd);
    if (start.isValid() && end.isValid()) {
      const timeFrame = this.timeFrames.find(
        (tf) =>
          tf.start.h === start.hours() &&
          tf.end.h === end.hours() &&
          tf.start.m === start.minutes() &&
          tf.end.m === end.minutes()
      );
      if (timeFrame) {
        return timeFrame.id;
      }
    }
    return this.timeFrames[0].id;
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    const edit = this.getEdit();
    if (this.isNew() && isEmpty(edit)) {
      this.modalController.dismiss(null);
    } else {
      this.modalController.dismiss(edit);
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  private getEdit(): AvalancheActivityObs2EditModel {
    return {
      ...this.getDates(),
      EstimatedNumTID: this.estimatedNumTid(),
      AvalancheExtTID: this.avalancheExtTid(),
      AvalTriggerSimpleTID: this.avalTriggerSimpleTid(),
      DestructiveSizeTID: this.destructiveSizeTid(),
      AvalPropagationTID: this.avalPropagationTid(),
      ExposedHeightComboTID: this.exposedHeightComboTid(),
      ExposedHeight1: this.exposedHeight1(),
      ExposedHeight2: this.exposedHeight2(),
      ValidExposition: this.validExposition(),
      Comment: this.comment(),
    };
  }

  private getDates(): Partial<AvalancheActivityObs2EditModel> {
    const startDate = this.startDate();
    const selectedTimeFrameId = this.selectedTimeFrame();
    const timeFrame = this.timeFrames.find((tf) => tf.id === selectedTimeFrameId);
    if (startDate && timeFrame) {
      return {
        DtStart: moment(startDate).hours(timeFrame.start.h).minutes(timeFrame.start.m).toISOString(true),
        DtEnd: moment(startDate).hours(timeFrame.end.h).minutes(timeFrame.end.m).toISOString(true),
      };
    }
    return {};
  }
}
