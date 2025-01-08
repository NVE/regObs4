import { Component, NgZone, Input, inject, viewChild } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  Platform,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export type RefreshFunc = (cancelPromise: Promise<boolean>) => Promise<any>;

@Component({
  selector: 'app-refresh-with-cancel',
  templateUrl: './refresh-with-cancel.component.html',
  styleUrls: ['./refresh-with-cancel.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, NgIf, TranslatePipe],
})
export class RefreshWithCancelComponent {
  private ngZone = inject(NgZone);
  private platform = inject(Platform);

  showCancel = false;

  // @Output() refresh: EventEmitter<Promise<boolean>> = new EventEmitter();
  readonly refresher = viewChild.required(IonRefresher);
  @Input() refreshFunc: RefreshFunc = () => Promise.resolve();
  @Input() cancelSubject = new Subject<boolean>();
  @Input() disabled = false;

  spinner = this.platform.is('android') ? 'crescent' : 'lines';

  cancel(): void {
    this.cancelSubject.next(true);
  }

  private getCancelPromise() {
    return firstValueFrom(this.cancelSubject.asObservable());
  }

  async doRefresh(): Promise<void> {
    if (this.refreshFunc) {
      const cancelPromise = this.getCancelPromise();
      cancelPromise.then(() => this.complete());
      // It takes to long to wait for function to complete (even when cancelled), so hide refresher on cancel.
      this.ngZone.run(() => {
        this.showCancel = true;
      });
      try {
        await this.refreshFunc(cancelPromise);
      } finally {
        this.complete();
      }
    }
  }

  private complete() {
    this.ngZone.run(() => {
      this.refresher().complete();
    });
    this.ngZone.run(() => {
      this.showCancel = false;
    });
  }
}
