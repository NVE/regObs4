import { NgModule } from '@angular/core';
import { NumericInputModalPage } from './numeric-input-modal.page';
import { SharedModule } from '../../../../../modules/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [NumericInputModalPage],
  entryComponents: [NumericInputModalPage]
})
export class NumericInputModalPageModule {}
