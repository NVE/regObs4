import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  scan,
  filter,
  throttleTime,
  takeUntil,
  switchMap
} from 'rxjs/operators';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { enterZone } from '../../../../core/helpers/observable-helper';
import { IonContent } from '@ionic/angular';
import moment from 'moment';
import { GeoPositionLog } from '../../../../core/services/geo-position/geo-position-log.interface';
import { GeoPositionErrorCode } from '../../../../core/services/geo-position/geo-position-error.enum';
import { PositionError } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-gps-debug',
  templateUrl: './gps-debug.component.html',
  styleUrls: ['./gps-debug.component.scss']
})
export class GpsDebugComponent implements OnInit, OnDestroy {
  showLog$: Observable<boolean>;
  geoPositionLog: GeoPositionLog[];
  isOpen: boolean;
  isTracking: boolean;
  private ngDestroy$ = new Subject<void>();

  @ViewChild('GpsLogPanel') panel: IonContent;

  constructor(
    private userSettingService: UserSettingService,
    private geoPositionService: GeoPositionService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isOpen = false;
    this.isTracking = false;
    this.showLog$ = this.userSettingService.userSetting$.pipe(
      map((us) => us.featureToggeGpsDebug),
      distinctUntilChanged(),
      enterZone(this.ngZone)
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
        this.ngZone.run(() => {
          this.geoPositionLog = val;
        });
        this.ngZone.run(() => {
          this.scrollToBottom();
        });
      });
    this.geoPositionService.log$
      .pipe(
        filter(
          (log) =>
            log.status === 'StartGpsTracking' ||
            log.status === 'StopGpsTracking'
        ),
        map((log) => (log.status === 'StartGpsTracking' ? true : false)),
        distinctUntilChanged(),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((val) => {
        setTimeout(() => {
          this.isTracking = val;
        });
      });
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  scrollToBottom() {
    if (this.panel) {
      this.panel.scrollToBottom();
    }
  }

  timestampToString(timestamp: number) {
    return moment.unix(timestamp).local().format('dd.MM HH:mm:ss.SSS');
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
