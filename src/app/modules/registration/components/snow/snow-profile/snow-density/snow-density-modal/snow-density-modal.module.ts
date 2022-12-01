import { NgModule } from '@angular/core';
import { SnowDensityModalPage } from './snow-density-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';
import { SnowDensityLayerModalPageModule } from '../snow-density-layer-modal/snow-density-layer-modal.module';

@NgModule({
  imports: [SharedComponentsModule, SnowDensityLayerModalPageModule],
  declarations: [SnowDensityModalPage],
})
export class SnowDensityModalPageModule {}
