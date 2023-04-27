import { Capacitor } from '@capacitor/core';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { OverlayEventDetail, DatetimePresentation } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { getLangKeyString } from '../../modules/common-core/models/lang-key.enum';
import { DATE_FORMAT, DATE_FORMAT_HOURS } from 'src/app/modules/shared/services/date-helper/date-format';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
/**
 * Component for displaying a date and time picker.
 * In the mobile app date and time picker is displayed in a modal, and the selected date and time is returned to the parent component.
 * Web version uses the regular input with browser calendar
 */
export class DatetimePickerComponent implements OnInit {
  @Input() dateTime: string;
  @Input() dateInputType?: 'datetime-local' | 'date' = 'datetime-local';

  // For web only. We have to change dateTime moment format (which is also supported by ionic) yyyy-mm-ddThh:mm:ss.000+01:00 to web supported format yyyy-MM-DDTHH:mm
  get dateFormatForWeb(): string {
    if (this.dateTime) {
      const formatedDate =
        this.dateInputType == 'datetime-local'
          ? moment(new Date(this.dateTime).toISOString()).format(DATE_FORMAT_HOURS)
          : moment(new Date(this.dateTime).toISOString()).format(DATE_FORMAT);
      return formatedDate;
    } else {
      return '';
    }
  }

  @Input() language: string; // Automatically sets formatting of Ionic Datetime component. Can be manually overridden.
  @Input() minDate?: string; // Sets the min date selectable from the date picker
  @Input() maxDate = moment(new Date()).format(DATE_FORMAT); // Sets the max date selectable from the date picker
  @Input() dateTimeFormat = 'dd. MMM yyyy HH:mm'; // Formats how the dateTime is represented as a string to the user
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
  @Input() presentation: DatetimePresentation = 'date-time';
  @Input() buttonSize: 'small' | 'default' | 'large' = 'default'; // Sets the main ion-button size (values are from Ionic)
  @Input() datePickerOpen = false;
  @Input() resetable = false;

  @Output() datePickerOpenChange = new EventEmitter<boolean>();
  @Output() dateTimeChange = new EventEmitter<string>(); // Can be used to manually trigger wanted functionality when the dateTime is changed.

  isPlatformNative = Capacitor.isNativePlatform();

  @ViewChild(IonModal) modal: IonModal;

  constructor(private userSettings: UserSettingService) {}

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

  /**
   * Checks the user input and emits it with time zones. If min or max date is incorrect it sets the defaults
   * @param date - string
   */
  changeDateOnWeb(dateInput: string) {
    if (dateInput) {
      this.dateTimeChange.emit(moment(dateInput).toISOString(true));
    }
  }

  /**
   * Updates the tempDate when the user changes the date, if the event has a value and is not an array
   * @param event - CustomEvent<DatetimeChangeEventDetail>
   * @returns false if the event.detail.value is not defined or if it is an array.
   */
  updateTempDateTime(dateInput: string): boolean {
    if (!dateInput || Array.isArray(dateInput)) return false;
    this.dateTime = moment(dateInput).format();
  }
}
