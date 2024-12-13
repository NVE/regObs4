import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../../../shared-components.module';
import { IceLayerPage } from './ice-layer.page';

@NgModule({
  imports: [SharedComponentsModule, IceLayerPage],
})
export class IceLayerPageModule {}
