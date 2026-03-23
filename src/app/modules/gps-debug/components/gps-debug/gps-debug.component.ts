import { Component, OnInit, OnDestroy, inject, viewChild, signal, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, distinctUntilChanged, scan, filter, throttleTime, takeUntil, switchMap } from 'rxjs/operators';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { GeoPositionLog, PositionError } from '../../../../core/services/geo-position/geo-position-log.interface';
import { GeoPositionErrorCode } from '../../../../core/services/geo-position/geo-position-error.enum';
import { NgClass, AsyncPipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowDownCircle, arrowUpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-gps-debug',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gps-debug.component.html',
  styleUrls: ['./gps-debug.component.scss'],
  imports: [AsyncPipe, DecimalPipe, IonContent, IonFab, IonFabButton, IonIcon, NgClass, TranslatePipe],
})
export class GpsDebugComponent implements OnInit, OnDestroy {
  private userSettingService = inject(UserSettingService);
  private geoPositionService = inject(GeoPositionService);

  showLog$!: Observable<boolean>;
  geoPositionLog = signal<GeoPositionLog[]>([]);
  isOpen = signal(false);
  isTracking = signal(false);
  private ngDestroy$ = new Subject<void>();

  readonly panel = viewChild<IonContent>('GpsLogPanel');

  constructor() {
    addIcons({ arrowDownCircle, arrowUpCircle });
  }

  ngOnInit() {
    this.showLog$ = this.userSettingService.userSetting$.pipe(
      map((us) => us.featureToggeGpsDebug),
      distinctUntilChanged()
    );
    this.showLog$
      .pipe(
        switchMap((show) =>
          show
            ? this.geoPositionService.log$.pipe(
                scan((acc: GeoPositionLog[], val) => {
                  acc.push(val);
                  return acc.slice(-50);
                }, []),
                throttleTime(100)
              )
            : of([])
        ),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((val) => {
        this.geoPositionLog.set(val);
        this.scrollToBottom();
      });
    this.geoPositionService.log$
      .pipe(
        filter((log) => log.status === 'StartGpsTracking' || log.status === 'StopGpsTracking'),
        map((log) => (log.status === 'StartGpsTracking' ? true : false)),
        distinctUntilChanged(),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((val) => {
        this.isTracking.set(val);
      });
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }

  scrollToBottom() {
    const panel = this.panel();
    if (panel) {
      panel.scrollToBottom();
    }
  }

  timestampToString(timestamp: number) {
    const isMillis = timestamp > 99999999999; //sometimes we get timestamp in seconds instead of millis
    const timestampInMillis = isMillis ? timestamp : timestamp * 1000;
    const result = new Date(timestampInMillis).toLocaleString();
    return result;
  }

  getErrorCodeOrMessage(err: PositionError) {
    if (!err) {
      return 'Empty error';
    }
    switch (err.code) {
      case GeoPositionErrorCode.PermissionDenied:
        return 'Permission denied';
      case GeoPositionErrorCode.PositionUnavailable:
        return 'Position unavailable';
      case GeoPositionErrorCode.Timeout:
        return 'Timeout';
      default:
        return err.message;
    }
  }
}
