import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalMapImagePage } from './modal-map-image.page';
import { TranslateModule } from '@ngx-translate/core';
import { MapImageComponent } from '../../components/map-image/map-image.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LeafletModule,
  ],
  declarations: [ModalMapImagePage, MapImageComponent],
  entryComponents: [ModalMapImagePage],
  exports: [MapImageComponent],
})
export class ModalMapImagePageModule { }
