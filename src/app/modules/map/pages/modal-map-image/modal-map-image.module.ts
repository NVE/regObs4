import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalMapImagePage } from './modal-map-image.page';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapImageModule } from '../../components/map-image/map-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LeafletModule,
    MapImageModule
  ],
  declarations: [ModalMapImagePage],
  entryComponents: [ModalMapImagePage]
})
export class ModalMapImagePageModule {}
