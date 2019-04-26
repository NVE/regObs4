import { NgModule } from '@angular/core';
import { SnowDensityModalPage } from './snow-density-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';

@NgModule({
  imports: [
    SharedComponentsModule
  ],
  declarations: [SnowDensityModalPage],
  entryComponents: [SnowDensityModalPage],
})
export class SnowDensityModalPageModule { }
