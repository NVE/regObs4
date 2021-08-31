import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { switchMap } from 'rxjs/operators';
import { LangKey } from '../../../../core/models/langKey';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-geo-name',
  templateUrl: './geo-name.component.html',
  styleUrls: ['./geo-name.component.scss']
})
export class GeoNameComponent implements OnChanges {
  @Input() geoHazards: GeoHazard[];

  name$: Observable<string>;
  language$: Observable<LangKey>;

  constructor(private geoHelperService: GeoHelperService, private userSettingsService: UserSettingService) {
  }

  ngOnChanges(): void {
    this.name$ = this.userSettingsService.language$.pipe(switchMap( _ => this.geoHelperService.getName(this.geoHazards))); 
  }
}
