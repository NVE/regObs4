import { NgModule } from '@angular/core';
import { StratProfileModalPage } from './strat-profile-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';
import { StratProfileLayerModalPageModule } from '../strat-profile-layer-modal/strat-profile-layer-modal.module';
import { StratProfileLayerHistoryModalPageModule } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.module';


@NgModule({
  imports: [
    SharedComponentsModule,
    StratProfileLayerModalPageModule,
    StratProfileLayerHistoryModalPageModule,
  ],
  declarations: [StratProfileModalPage],
  entryComponents: [StratProfileModalPage],
})
export class StratProfileModalPageModule { }
