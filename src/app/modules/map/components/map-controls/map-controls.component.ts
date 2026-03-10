import { Component, input , ChangeDetectionStrategy } from '@angular/core';
import { MapSearchComponent } from './map-search/map-search.component';
import { FullscreenToggleComponent } from './fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './gps-center/gps-center.component';
import { MapZoomComponent } from './map-zoom/map-zoom.component';

@Component({
  selector: 'app-map-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss'],
  imports: [MapSearchComponent, FullscreenToggleComponent, GpsCenterComponent, MapZoomComponent],
})
export class MapControlsComponent {
  readonly showFullscreenToggle = input(true);
  readonly showGpsCenter = input(true);
  readonly showZoomButtons = input(true);
}
