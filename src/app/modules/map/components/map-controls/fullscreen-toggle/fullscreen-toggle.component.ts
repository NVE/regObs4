import { IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FullscreenService } from '../../../../../core/services/fullscreen/fullscreen.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss'],
  imports: [IonFab, IonFabButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenToggleComponent {
  private fullscreenService = inject(FullscreenService);

  isFullscreen = toSignal(this.fullscreenService.isFullscreen$, { initialValue: false });
  iconSrc = computed(() => `/assets/icon/${this.isFullscreen() ? 'collapse' : 'expand'}.svg`);

  toggleFullscreen() {
    this.fullscreenService.toggleFullscreen();
  }
}
