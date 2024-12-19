import { IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FullscreenService } from '../../../../../core/services/fullscreen/fullscreen.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss'],
  imports: [AsyncPipe, IonFab, IonFabButton, IonIcon],
})
export class FullscreenToggleComponent {
  private fullscreenService = inject(FullscreenService);

  isFullscreen$: Observable<boolean>;

  constructor() {
    this.isFullscreen$ = this.fullscreenService.isFullscreen$;
  }

  toggleFullscreen() {
    this.fullscreenService.toggleFullscreen();
  }

  getSrc(isFullscreen: boolean) {
    return `/assets/icon/${isFullscreen ? 'collapse' : 'expand'}.svg`;
  }
}
