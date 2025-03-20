import { IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonFab, IonFabButton, IonIcon],
})
export class GpsCenterComponent {
  private mapService = inject(MapService);

  followMode = toSignal(this.mapService.followMode$, { initialValue: false });

  constructor() {
    addIcons({ locate });
  }

  centerMapToUser() {
    this.mapService.centerMapToUser();
  }
}
