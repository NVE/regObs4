import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map/map.service';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss']
})
export class GpsCenterComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  centerMapToUser() {
    this.mapService.centerMapToUser();
  }

}
