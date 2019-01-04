import { Component, OnInit, EventEmitter, Output, NgZone, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-refresh-with-cancel',
  templateUrl: './refresh-with-cancel.component.html',
  styleUrls: ['./refresh-with-cancel.component.scss']
})
export class RefreshWithCancelComponent implements OnInit {

  showCancel = false;
  private cancelSubject: Subject<boolean>;

  // @Output() refresh: EventEmitter<Promise<boolean>> = new EventEmitter();
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @Input() refreshFunc: (cancelPromise: Promise<boolean>) => Promise<any>;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.cancelSubject = new Subject<boolean>();
  }

  cancel() {
    this.cancelSubject.next(true);
  }

  private getCancelPromise() {
    return this.cancelSubject.asObservable().pipe(take(1)).toPromise();
  }

  async doRefresh() {
    if (this.refreshFunc) {
      const cancelPromise = this.getCancelPromise();
      this.ngZone.run(() => {
        this.showCancel = true;
      });
      try {
        await this.refreshFunc(cancelPromise);
      } finally {
        this.ngZone.run(() => {
          this.showCancel = false;
          this.refresher.complete();
        });
      }
    }
  }
}
