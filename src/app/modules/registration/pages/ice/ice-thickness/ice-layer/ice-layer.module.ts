import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../../../shared-components.module';
import { IceLayerPage } from './ice-layer.page';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [IceLayerPage],
  entryComponents: [IceLayerPage]
})
export class IceLayerPageModule {}
