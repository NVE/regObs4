import { NgModule } from '@angular/core';
import { SetDamageLocationPage } from './set-damage-location.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent } from '@ionic/angular/standalone';

@NgModule({
  imports: [SharedComponentsModule, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent],
  declarations: [SetDamageLocationPage],
})
export class SetDamageLocationPageModule {}
