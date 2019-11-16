import { Component, OnInit, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { GeoPositionService } from '../../core/services/geo-position/geo-position.service';
import { enterZone } from '../../core/helpers/observable-helper';

@Component({
  selector: 'app-gps-debug',
  templateUrl: './gps-debug.component.html',
  styleUrls: ['./gps-debug.component.scss'],
})
export class GpsDebugComponent implements OnInit {

  showLog$: Observable<boolean>;
  geoPositionLog$: Observable<any>;

  constructor(
    userSettingService: UserSettingService,
    geoPositionService: GeoPositionService,
    ngZone: NgZone) {
    this.showLog$ = userSettingService.userSettingObservable$.pipe(map((us) =>
      us.featureToggeGpsDebug), distinctUntilChanged(), enterZone(ngZone));
    this.geoPositionLog$ = geoPositionService.log$;
  }

  ngOnInit() { }

}
