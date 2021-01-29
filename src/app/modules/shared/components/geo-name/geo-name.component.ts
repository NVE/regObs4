import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable } from 'rxjs';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';

@Component({
  selector: 'app-geo-name',
  templateUrl: './geo-name.component.html',
  styleUrls: ['./geo-name.component.scss']
})
export class GeoNameComponent implements OnInit {
  @Input() geoHazards: GeoHazard[];

  name$: Observable<string>;

  constructor(private geoHelperService: GeoHelperService) {}

  ngOnInit() {
    this.name$ = this.geoHelperService.getName(this.geoHazards);
  }
}
