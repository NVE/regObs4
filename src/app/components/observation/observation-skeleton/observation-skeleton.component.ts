import {
  IonGrid,
  IonItem,
  IonCardHeader,
  IonRow,
  IonCardContent,
  IonSkeletonText,
  IonCol,
  IonIcon,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { shareSocial } from 'ionicons/icons';

@Component({
  selector: 'app-observation-skeleton',
  templateUrl: './observation-skeleton.component.html',
  styleUrls: ['./observation-skeleton.component.scss'],
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonRow,
    IonSkeletonText,
    SvgIconComponent,
    TranslateModule,
  ],
})
export class ObservationSkeletonComponent {
  constructor() {
    addIcons({ shareSocial });
  }
}
