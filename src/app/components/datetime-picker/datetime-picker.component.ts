import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatetimeChangeEventDetail } from '@ionic/core/dist/types/components/datetime/datetime-interface';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  @Input() localDate: string;
  @Input() locale = 'nb-no';
  @Input() maxDate: string;
  @Input() dateFormat = 'dd. MMM yyyy HH:mm';

  @Output() localDateChange = new EventEmitter<string>();

  private tempDate: string;

  @ViewChild(IonModal) modal: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.tempDate, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail<string>>) {
    if (event.detail.data && event.detail.role === 'confirm') {
      this.localDateChange.emit(event.detail.data);
    }
  }

  ngOnInit(): void {
  }

  updateTempDateTime(event: CustomEvent<DatetimeChangeEventDetail>) {
    if (!event.detail.value || (Array.isArray(event.detail.value))) return false;
    this.tempDate = event.detail.value;
  }

}
