import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail, DatetimePresentation } from '@ionic/core/components';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { firstValueFrom } from 'rxjs';
import { getLangKeyString } from '../../modules/common-core/models/lang-key.enum';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
/**
 * Component for displaying a date and time picker.
 * The date and time picker is displayed in a modal, and the selected date and time is returned to the parent component.
 */
export class DatetimePickerComponent implements OnInit {
  // Supports Date.prototype.toISOString() format (YYYY-MM-DDTHH:mm:ss.sssZ)
  // We need datePipe.transform to show the current date in the input node on web
  _dateTime: string;
  @Input() set dateTime(value: string) {
    this._dateTime = this.datePipe.transform(value, 'yyyy-MM-ddTHH:mm');
  }

  get dateTime(): string {
    return this._dateTime;
  }
  @Input() platform: boolean;
  @Input() language: string; // Automatically sets formatting of Ionic Datetime component. Can be manually overridden.
  @Input() minDate: string; // Sets the min date selectable from the date picker
  @Input() maxDate: string; // Sets the max date selectable from the date picker
  @Input() dateTimeFormat = 'dd. MMM yyyy HH:mm'; // Formats how the dateTime is represented as a string to the user
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
  @Input() presentation: DatetimePresentation = 'date-time';
  @Input() buttonSize: 'small' | 'default' | 'large' = 'default'; // Sets the main ion-button size (values are from Ionic)
  @Input() datePickerOpen = false;
  @Input() resetable = false;
  @Output() datePickerOpenChange = new EventEmitter<boolean>();
  @Output() dateTimeChange = new EventEmitter<string>(); // Can be used to manually trigger wanted functionality when the dateTime is changed.

  private tempDate: string;

  @ViewChild(IonModal) modal: IonModal;

  constructor(private userSettings: UserSettingService, private datePipe: DatePipe) {}

  async ngOnInit(): Promise<void> {
    if (!this.language) {
      const userSetting = await firstValueFrom(this.userSettings.userSetting$);
      this.language = getLangKeyString(userSetting.language);
    }
  }

  openModal() {
    this.datePickerOpen = true;
    this.datePickerOpenChange.emit(this.datePickerOpen);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.dateTime, 'confirm');
  }

  /**
   * If the user clicks the confirm button, emit the date that was selected
   * @param event - CustomEvent<OverlayEventDetail<string>>
   */
  onWillDismiss(event: CustomEvent<OverlayEventDetail<string>>) {
    this.datePickerOpen = false;
    this.datePickerOpenChange.emit(this.datePickerOpen);

    if ((event.detail.data && event.detail.role === 'confirm') || this.resetable) {
      this.dateTimeChange.emit(event.detail.data);
    }
  }

  updateDateOnWeb(event: string) {
    if (event) {
      //validate user input
      const correctDateFormat = moment(event).toISOString(true);
      const min = moment(this.minDate).toISOString(true);
      const max = moment(this.maxDate).toISOString(true);
      if (correctDateFormat < min) {
        this.updateTempDateTime(min);
        this.dateTimeChange.emit(min);
        this.dateTime = min;
        return;
      } else if (correctDateFormat > max) {
        this.updateTempDateTime(max);
        this.dateTimeChange.emit(max);
        this.dateTime = max;
        return;
      }

      this.updateTempDateTime(correctDateFormat);
      this.dateTimeChange.emit(correctDateFormat);
    }
  }

  /**
   * Updates the tempDate when the user changes the date, if the event has a value and is not an array
   * @param event - CustomEvent<DatetimeChangeEventDetail>
   * @returns false if the event.detail.value is not defined or if it is an array.
   */
  updateTempDateTime(event: string) {
    if (!event || Array.isArray(event)) return false;
    this.dateTime = event;
  }
}
