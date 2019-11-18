import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, scan, debounceTime, filter, tap } from 'rxjs/operators';
import { GeoPositionService, GeoPositionLog } from '../../../../core/services/geo-position/geo-position.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { enterZone } from '../../../../core/helpers/observable-helper';
import { IonContent } from '@ionic/angular';
import moment from 'moment';

@Component({
  selector: 'app-gps-debug',
  templateUrl: './gps-debug.component.html',
  styleUrls: ['./gps-debug.component.scss'],
})
export class GpsDebugComponent implements OnInit {

  showLog$: Observable<boolean>;
  geoPositionLog$: Observable<GeoPositionLog[]>;
  isOpen = true;
  isTracking$: Observable<boolean>;

  @ViewChild(IonContent, { static: false }) panel: IonContent;

  constructor(
    userSettingService: UserSettingService,
    geoPositionService: GeoPositionService,
    ngZone: NgZone) {
    this.showLog$ = userSettingService.userSettingObservable$.pipe(map((us) =>
      us.featureToggeGpsDebug), distinctUntilChanged(), enterZone(ngZone));
    this.geoPositionLog$ = geoPositionService.log$.pipe(
      scan((acc: GeoPositionLog[], val) => {
        acc.push(val);
        return acc.slice(-50);
      }, []), debounceTime(100), tap(() => this.scrollToBottom()));
    this.isTracking$ = geoPositionService.log$.pipe(
      filter((log) => log.status === 'StartGpsTracking' || log.status === 'StopGpsTracking'),
      map((log) => log.status === 'StartGpsTracking' ? true : false),
      distinctUntilChanged()
    );
  }

  ngOnInit() { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  scrollToBottom() {
    if (this.panel) {
      this.panel.scrollToBottom();
    }
  }

  timestampToString(timestamp: number) {
    return moment.unix(timestamp).format('HH:mm:ss.SSS');
  }

}
