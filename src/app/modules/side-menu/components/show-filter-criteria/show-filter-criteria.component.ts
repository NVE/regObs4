import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { BreakpointService } from '../../../../core/services/breakpoint.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-show-filter-criteria',
  templateUrl: './show-filter-criteria.component.html',
  styleUrls: ['./show-filter-criteria.component.scss'],
})
export class ShowFilterCriteriaComponent implements OnInit {

  daysBack$: Observable<{value: number}>;
  isDesktop: boolean;
  currentGeoHazard$: Observable<GeoHazard[]>;

  constructor(public userSettingService: UserSettingService, private breakpointService: BreakpointService) { }

  ngOnInit() {
    this.daysBack$ = this.userSettingService.daysBackForCurrentGeoHazard$.
    pipe(map( value => ({
      value 
    })));  
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.currentGeoHazard$ = this.userSettingService.currentGeoHazard$;
  }
}
