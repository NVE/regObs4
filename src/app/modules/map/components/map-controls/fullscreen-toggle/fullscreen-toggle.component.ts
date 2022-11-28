import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullscreenService } from '../../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss'],
})
export class FullscreenToggleComponent {
  isFullscreen$: Observable<boolean>;

  constructor(private fullscreenService: FullscreenService) {
    this.isFullscreen$ = this.fullscreenService.isFullscreen$;
  }

  toggleFullscreen() {
    this.fullscreenService.toggleFullscreen();
  }

  getSrc(isFullscreen: boolean) {
    return `/assets/icon/${isFullscreen ? 'collapse' : 'expand'}.svg`;
  }
}
