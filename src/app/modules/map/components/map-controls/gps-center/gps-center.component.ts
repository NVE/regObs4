import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss']
})
export class GpsCenterComponent implements OnInit {

  followMode$: Observable<boolean>;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.followMode$ = this.mapService.followMode$;
  }

  centerMapToUser() {
    this.mapService.centerMapToUser();
  }

}
