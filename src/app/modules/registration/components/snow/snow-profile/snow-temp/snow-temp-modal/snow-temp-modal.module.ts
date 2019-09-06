import { NgModule } from '@angular/core';
import { SnowTempModalPage } from './snow-temp-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';
import { SnowTempLayerModalPageModule } from '../snow-temp-layer-modal/snow-temp-layer-modal.module';


@NgModule({
  imports: [
    SharedComponentsModule,
    SnowTempLayerModalPageModule,
  ],
  declarations: [SnowTempModalPage],
  entryComponents: [SnowTempModalPage],
})
export class SnowTempModalPageModule { }
