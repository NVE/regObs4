import { NgModule } from '@angular/core';
import { SnowTempLayerModalPage } from './snow-temp-layer-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [SnowTempLayerModalPage],
})
export class SnowTempLayerModalPageModule {}
