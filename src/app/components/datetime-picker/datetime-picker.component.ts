import { Component, inject, viewChild, input, model, effect, untracked } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal, Platform } from '@ionic/angular/standalone';
import { DatetimePresentation } from '@ionic/core/components';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';

// Brukes for å lage unike ider som kobler modal til input
let counter = 0;

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  imports: [IonDatetime, IonModal, TranslatePipe, IonDatetimeButton, FormsModule],
  host: {
    '(click)': 'open()',
  },
})
/**
 * Component for displaying a date and time picker.
 * The date and time picker is displayed in a modal, and the selected date and time is returned to the parent component.
 */
export class DatetimePickerComponent {
  private platform = inject(Platform);
  private modal = viewChild(IonModal);

  readonly dateTime = model<string>(); // Supports Date.prototype.toISOString() format (YYYY-MM-DDTHH:mm:ss.sssZ)
  readonly language = input<string>(); // Automatically sets formatting of Ionic Datetime component. Can be manually overridden.
  readonly minDate = input<string>(); // Sets the min date selectable from the date picker
  readonly maxDate = input<string>(); // Sets the max date selectable from the date picker
  readonly presentation = input<DatetimePresentation>('date-time');
  readonly resetable = input(false);

  preferWheel = this.platform.is('mobile');

  dateFormat = input<Pick<Intl.DateTimeFormatOptions, 'day' | 'month' | 'year' | 'weekday'>>({
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
  timeFormat = input<Pick<Intl.DateTimeFormatOptions, 'hour' | 'minute'>>({
    hour: '2-digit',
    minute: '2-digit',
  });

  id: string;

  constructor() {
    counter++;
    this.id = 'app-datetime-picker-' + counter;

    // Fant ikke noe enkel annen måte å oppdatere tiden på hvis max endres.
    // Det er egentlig ikke anbefalt å oppdatere state fra effect.
    effect(() => {
      const maxValue = this.maxDate();
      if (!maxValue) {
        return;
      }

      untracked(() => {
        const dateValue = this.dateTime();
        if (!dateValue) {
          return;
        }

        const max = moment(maxValue);
        const date = moment(dateValue);
        if (date.isValid() && max.isValid() && max.isBefore(date)) {
          this.dateTime.set(this.maxDate());
        }
      });
    });
  }

  open() {
    this.modal()?.present();
  }
}
