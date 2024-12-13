import { NgModule } from '@angular/core';
import { AddOrEditDangerObsModalPage } from './add-or-edit-danger-obs-modal.page';
import { SharedComponentsModule } from '../../../shared-components.module';

@NgModule({
  imports: [SharedComponentsModule, AddOrEditDangerObsModalPage],
})
export class AddOrEditDangerObsModalPageModule {}
