import { Component, Input, OnChanges } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { Observable } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';

@Component({
  selector: 'app-geo-name',
  templateUrl: './geo-name.component.html',
  styleUrls: ['./geo-name.component.scss']
})
export class GeoNameComponent implements OnChanges {
  @Input() geoHazards: GeoHazard[];

  name$: Observable<string>;

  constructor(private geoHelperService: GeoHelperService) {}

  ngOnChanges(): void {
    this.name$ = this.geoHelperService.getName(this.geoHazards);
  }
}
