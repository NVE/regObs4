import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatetimeChangeEventDetail } from '@ionic/core/dist/types/components/datetime/datetime-interface';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { firstValueFrom } from 'rxjs';
import { getLangKeyString } from '../../modules/common-core/models/lang-key.enum';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  @Input() localDate: string;
  @Input() locale: string;
  @Input() maxDate: string;
  @Input() dateFormat = 'dd. MMM yyyy HH:mm';

  @Output() localDateChange = new EventEmitter<string>();

  private tempDate: string;

  @ViewChild(IonModal) modal: IonModal;

  constructor(private userSettings: UserSettingService) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.locale) {
      const userSetting = await firstValueFrom(this.userSettings.userSetting$);
      this.locale = getLangKeyString(userSetting.language);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.tempDate, 'confirm');
  }

  /**
   * If the user clicks the confirm button, emit the date that was selected
   * @param event - CustomEvent<OverlayEventDetail<string>>
   */
  onWillDismiss(event: CustomEvent<OverlayEventDetail<string>>) {
    if (event.detail.data && event.detail.role === 'confirm') {
      this.localDateChange.emit(event.detail.data);
    }
  }

  /**
   * Updates the tempDate when the user changes the date, if the event has a value and is not an array
   * @param event - CustomEvent<DatetimeChangeEventDetail>
   * @returns false if the event.detail.value is not defined or if it is an array.
   */
  updateTempDateTime(event: CustomEvent<DatetimeChangeEventDetail>) {
    if (!event.detail.value || (Array.isArray(event.detail.value))) return false;
    this.tempDate = event.detail.value;
  }

}
