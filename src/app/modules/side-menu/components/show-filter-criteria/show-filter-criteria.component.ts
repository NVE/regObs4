import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-show-filter-criteria',
  templateUrl: './show-filter-criteria.component.html',
  styleUrls: ['./show-filter-criteria.component.scss'],
})
export class ShowFilterCriteriaComponent implements OnInit {

  daysBack$: Observable<{value: number}>;

  constructor(public userSettingService: UserSettingService) { }

  ngOnInit() {
    this.daysBack$ = this.userSettingService.daysBackForCurrentGeoHazard$.
    pipe(map( value => ({
      value 
    })))
  }
}
