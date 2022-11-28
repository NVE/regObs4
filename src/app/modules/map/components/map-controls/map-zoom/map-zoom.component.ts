import { Component } from '@angular/core';
import { MapZoomService } from '../../../services/map/map-zoom.service';

@Component({
  selector: 'app-map-zoom',
  templateUrl: './map-zoom.component.html',
  styleUrls: ['./map-zoom.component.scss'],
})
export class MapZoomComponent {
  constructor(private mapZoomService: MapZoomService) {}

  zoomIn(): void {
    this.mapZoomService.requestZoomIn();
  }

  zoomOut(): void {
    this.mapZoomService.requestZoomOut();
  }
}
