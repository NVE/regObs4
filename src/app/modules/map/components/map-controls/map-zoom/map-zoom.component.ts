import { IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { MapZoomService } from '../../../services/map/map-zoom.service';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';

@Component({
  selector: 'app-map-zoom',
  templateUrl: './map-zoom.component.html',
  styleUrls: ['./map-zoom.component.scss'],
  imports: [IonFab, IonFabButton, IonIcon],
})
export class MapZoomComponent {
  constructor(private mapZoomService: MapZoomService) {
    addIcons({ add, remove });
  }

  zoomIn(): void {
    this.mapZoomService.requestZoomIn();
  }

  zoomOut(): void {
    this.mapZoomService.requestZoomOut();
  }
}
