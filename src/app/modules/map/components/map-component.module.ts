import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapControlsModule } from './map-controls/map-controls.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, MapControlsModule],
  declarations: [MapComponent],
  exports: [MapComponent, MapControlsModule]
})
export class MapComponentModule {}
