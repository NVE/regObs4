import { NgModule } from '@angular/core';
import { StratProfileLayerHistoryModalPage } from './strat-profile-layer-history-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';

@NgModule({
  imports: [
    SharedComponentsModule
  ],
  declarations: [StratProfileLayerHistoryModalPage],
  entryComponents: [StratProfileLayerHistoryModalPage],
})
export class StratProfileLayerHistoryModalPageModule { }
