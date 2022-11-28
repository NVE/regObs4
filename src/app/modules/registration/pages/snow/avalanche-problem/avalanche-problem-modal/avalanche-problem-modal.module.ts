import { NgModule } from '@angular/core';
import { AvalancheProblemModalPage } from './avalanche-problem-modal.page';
import { SharedComponentsModule } from '../../../../shared-components.module';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [AvalancheProblemModalPage],
})
export class AvalancheProblemModalPageModule {}
