import { IonMenuButton } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { BreakpointService } from '../../../../core/services/breakpoint.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NgIf, AsyncPipe, LowerCasePipe } from '@angular/common';
import { GeoNameComponent } from '../../../shared/components/geo-name/geo-name.component';
import { CheckDaysOrWeeksBackComponent } from '../check-days-or-weeks-back/check-days-or-weeks-back.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-filter-criteria',
  templateUrl: './show-filter-criteria.component.html',
  styleUrls: ['./show-filter-criteria.component.scss'],
  imports: [
    AsyncPipe,
    CheckDaysOrWeeksBackComponent,
    GeoNameComponent,
    IonMenuButton,
    LowerCasePipe,
    NgIf,
    TranslateModule,
  ],
})
export class ShowFilterCriteriaComponent implements OnInit {
  daysBack$: Observable<{ value: number }>;
  isDesktop: boolean;
  showObservations$: Observable<boolean>;
  currentGeoHazard$: Observable<GeoHazard[]>;
  language$: Observable<LangKey>;

  constructor(public userSettingService: UserSettingService, private breakpointService: BreakpointService) {}

  ngOnInit() {
    this.daysBack$ = this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
      map((value) => ({
        value,
      }))
    );
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.currentGeoHazard$ = this.userSettingService.currentGeoHazard$;
    this.language$ = this.userSettingService.language$;
    this.showObservations$ = this.userSettingService.showObservations$;
  }
}
