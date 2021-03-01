import { Component, OnInit, NgZone, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { IonRefresher, Platform } from '@ionic/angular';

@Component({
  selector: 'app-refresh-with-cancel',
  templateUrl: './refresh-with-cancel.component.html',
  styleUrls: ['./refresh-with-cancel.component.scss']
})
export class RefreshWithCancelComponent implements OnInit {
  showCancel = false;

  // @Output() refresh: EventEmitter<Promise<boolean>> = new EventEmitter();
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @Input() refreshFunc: (cancelPromise: Promise<boolean>) => Promise<any>;
  @Input() cancelSubject: Subject<any>;
  @Input() disabled = false;

  spinner: string;

  constructor(private ngZone: NgZone, private platform: Platform) {}

  ngOnInit(): void {
    this.spinner = this.platform.is('android') ? 'crescent' : 'lines';
    if (!this.cancelSubject) {
      this.cancelSubject = new Subject<boolean>();
    }
  }

  cancel(): void {
    this.cancelSubject.next(true);
  }

  private getCancelPromise() {
    return this.cancelSubject.asObservable().pipe(take(1)).toPromise();
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
      this.refresher.complete();
    });
    this.ngZone.run(() => {
      this.showCancel = false;
    });
  }
}
