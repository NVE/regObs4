import { NgModule } from '@angular/core';
import { SnowDensityLayerModalPage } from './snow-density-layer-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [SnowDensityLayerModalPage],
})
export class SnowDensityLayerModalPageModule {}
