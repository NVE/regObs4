import { Component, Input, inject } from '@angular/core';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { MapSearchComponent } from './map-search/map-search.component';
import { FullscreenToggleComponent } from './fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './gps-center/gps-center.component';
import { MapZoomComponent } from './map-zoom/map-zoom.component';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss'],
  imports: [
    NgClass,
    MapSearchComponent,
    NgIf,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapZoomComponent,
    AsyncPipe,
  ],
})
export class MapControlsComponent {
  private fullscreenService = inject(FullscreenService);

  @Input() showFullscreenToggle = true;
  @Input() showGpsCenter = true;
  fullscreen$: Observable<boolean>;

  constructor() {
    const fullscreenService = this.fullscreenService;

    this.fullscreen$ = fullscreenService.isFullscreen$;
  }
}
