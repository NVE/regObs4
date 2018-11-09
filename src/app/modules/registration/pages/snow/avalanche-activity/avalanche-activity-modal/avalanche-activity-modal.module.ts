import { NgModule } from '@angular/core';
import { AvalancheActivityModalPage } from './avalanche-activity-modal.page';
import { SharedComponentsModule } from '../../../../shared-components.module';

@NgModule({
  imports: [
    SharedComponentsModule,
  ],
  declarations: [AvalancheActivityModalPage],
  entryComponents: [AvalancheActivityModalPage],
})
export class AvalancheActivityModalPageModule { }
