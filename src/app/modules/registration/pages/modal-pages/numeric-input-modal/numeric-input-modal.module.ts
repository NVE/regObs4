import { NgModule } from '@angular/core';
import { NumericInputModalPage } from './numeric-input-modal.page';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [NumericInputModalPage],
})
export class NumericInputModalPageModule {}
