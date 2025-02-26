import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  viewChild,
  input,
  linkedSignal,
  model,
  computed,
  signal,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { OverlayEventDetail, DatetimePresentation } from '@ionic/core/components';
import { DatetimeChangeEventDetail } from '@ionic/core/dist/types/components/datetime/datetime-interface';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { firstValueFrom } from 'rxjs';
import { getLangKeyString } from '../../modules/common-core/models/lang-key.enum';
import { NgClass, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  imports: [
    DatePipe,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    NgClass,
    TranslatePipe,
  ],
})
/**
 * Component for displaying a date and time picker.
 * The date and time picker is displayed in a modal, and the selected date and time is returned to the parent component.
 */
export class DatetimePickerComponent implements OnInit {
  private userSettings = inject(UserSettingService);

  readonly dateTime = input<string>(); // Supports Date.prototype.toISOString() format (YYYY-MM-DDTHH:mm:ss.sssZ)
  readonly language = input<string>(); // Automatically sets formatting of Ionic Datetime component. Can be manually overridden.
  readonly minDate = input<string>(); // Sets the min date selectable from the date picker
  readonly maxDate = input<string>(); // Sets the max date selectable from the date picker
  readonly dateTimeFormat = input('dd. MMM yyyy HH:mm'); // Formats how the dateTime is represented as a string to the user
  readonly textAlign = input<'left' | 'center' | 'right'>('left');
  readonly presentation = input<DatetimePresentation>('date-time');
  readonly buttonSize = input<'small' | 'default' | 'large'>('default'); // Sets the main ion-button size (values are from Ionic)
  readonly resetable = input(false);

  // brukes på web til å sette type på input-feltet
  inputType = computed(() => {
    switch (this.presentation()) {
      case 'date':
        return 'date';
      case 'time':
        return 'time';
    }
    return 'datetime-local';
  });
  //  dateTimeLocal = computed(() => (this.dateTime() ? this.dateTime()?.slice(0, 16) : ''));
  // dateTimeLocal = signal(this.dateTime());
  dateTimeLocal = signal(new Date().toISOString());

  readonly datePickerOpen = model(false);

  @Output() dateTimeChange = new EventEmitter<string>(); // Can be used to manually trigger wanted functionality when the dateTime is changed.

  locale = linkedSignal(() => this.language());

  private tempDate?: string;

  readonly modal = viewChild(IonModal);
  readonly isDesktop = !Capacitor.isNativePlatform();

  async ngOnInit(): Promise<void> {
    if (!this.locale()) {
      const userSetting = await firstValueFrom(this.userSettings.userSetting$);
      this.locale.set(getLangKeyString(userSetting.language));
    }
    if (this.isDesktop) {
      // const input = document.querySelector('input');
      // input?.addEventListener('change', this.updateTempDateTime as EventListener);
      const input = document.querySelector('input');
      input?.addEventListener('change', this.updateTempDateTimeFromInput.bind(this) as EventListener);
    }
  }

  openModal() {
    this.datePickerOpen.set(true);
  }

  cancel() {
    this.modal()?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal()?.dismiss(this.tempDate, 'confirm');
  }

  /**
   * If the user clicks the confirm button, emit the date that was selected
   * @param event - CustomEvent<OverlayEventDetail<string>>
   */
  onWillDismiss(event: CustomEvent<OverlayEventDetail<string>>) {
    this.datePickerOpen.set(false);

    if ((event.detail.data && event.detail.role === 'confirm') || this.resetable()) {
      this.dateTimeChange.emit(event.detail.data);
    }
  }

  /**
   * Updates the tempDate when the user changes the date, if the event has a value and is not an array
   * @param event - CustomEvent<DatetimeChangeEventDetail>
   * @returns false if the event.detail.value is not defined or if it is an array.
   */
  updateTempDateTime(event: CustomEvent<DatetimeChangeEventDetail>) {
    if (!event.detail.value || Array.isArray(event.detail.value)) return;
    this.tempDate = event.detail.value;
  }

  /**
   * Updates the tempDate when the user changes the time using the input element
   * @param event - Event
   */
  updateTempDateTimeFromInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const currentDate = new Date(input.value);
      this.tempDate = currentDate.toISOString();
    }
  }
}
