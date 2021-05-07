import { NgModule } from '@angular/core';
import { MapComponentModule } from '../map-component.module';
import { MapImageComponent } from './map-image.component';

@NgModule({
  imports: [MapComponentModule],
  declarations: [MapImageComponent],
  exports: [MapImageComponent]
})
export class MapImageModule {}
