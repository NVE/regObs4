import {
  IonToolbar,
  IonListHeader,
  IonItem,
  IonLabel,
  IonContent,
  IonMenuButton,
  IonIcon,
  IonTitle,
  IonList,
  IonHeader,
  IonButtons,
} from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { map, chevronForward, walk } from 'ionicons/icons';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    TranslatePipe,
  ],
})
export class TripPage {
  constructor() {
    addIcons({ map, chevronForward, walk });
  }
}
