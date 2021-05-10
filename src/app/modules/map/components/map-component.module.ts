import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapControlsModule } from './map-controls/map-controls.module';
import { MapImageComponent } from './map-image/map-image.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, MapControlsModule],
  declarations: [MapComponent, MapImageComponent],
  exports: [MapComponent, MapImageComponent, MapControlsModule]
})
export class MapComponentModule {}
