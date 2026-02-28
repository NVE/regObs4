import { Component, inject, viewChild, input, signal } from '@angular/core';
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

import { TranslatePipe } from '@ngx-translate/core';

export type RefreshFunc = (cancelPromise: Promise<boolean>) => Promise<any>;

@Component({
  selector: 'app-refresh-with-cancel',
  templateUrl: './refresh-with-cancel.component.html',
  styleUrls: ['./refresh-with-cancel.component.scss'],
  imports: [IonButton, IonCol, IonGrid, IonRefresher, IonRefresherContent, IonRow, TranslatePipe],
})
export class RefreshWithCancelComponent {
  private platform = inject(Platform);

  showCancel = signal(false);

  readonly refresher = viewChild.required(IonRefresher);
  readonly refreshFunc = input<RefreshFunc>(() => Promise.resolve());
  readonly cancelSubject = input(new Subject<boolean>());
  readonly disabled = input(false);

  spinner = this.platform.is('android') ? 'crescent' : 'lines';

  cancel(): void {
    this.cancelSubject().next(true);
  }

  private getCancelPromise() {
    return firstValueFrom(this.cancelSubject().asObservable());
  }

  async doRefresh(): Promise<void> {
    const refreshFunc = this.refreshFunc();
    if (refreshFunc) {
      const cancelPromise = this.getCancelPromise();
      cancelPromise.then(() => this.complete());
      // It takes to long to wait for function to complete (even when cancelled), so hide refresher on cancel.
      this.showCancel.set(true);
      try {
        await refreshFunc(cancelPromise);
      } finally {
        this.complete();
      }
    }
  }

  private complete() {
    this.refresher().complete();
    this.showCancel.set(false);
  }
}
