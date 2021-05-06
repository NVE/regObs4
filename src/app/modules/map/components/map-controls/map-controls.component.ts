import { Component } from '@angular/core';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent {
  fullscreen$: Observable<boolean>;

  constructor(private fullscreenService: FullscreenService) {
    this.fullscreen$ = fullscreenService.isFullscreen$;
  }
}
