import { NgModule } from '@angular/core';
import { StratProfileModalPage } from './strat-profile-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';
import { StratProfileLayerModalPageModule } from '../strat-profile-layer-modal/strat-profile-layer-modal.module';


@NgModule({
  imports: [
    SharedComponentsModule,
    StratProfileLayerModalPageModule,
  ],
  declarations: [StratProfileModalPage],
  entryComponents: [StratProfileModalPage],
})
export class StratProfileModalPageModule { }
