import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-list-end-info',
  templateUrl: './list-end-info.component.html',
  styleUrls: ['./list-end-info.component.scss'],
  imports: [IonIcon, TranslatePipe],
})
/**
 * Viser informasjonstekster i bunnen av observasjonslister
 */
export class ListEndInfoComponent {
  @Input() maxItemsFetched = false;
  @Input() registrationsLength = 0;
  @Input() registrationsCount = 0;
  constructor() {
    addIcons({ informationCircleOutline });
  }
}
