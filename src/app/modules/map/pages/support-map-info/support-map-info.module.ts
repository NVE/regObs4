import { NgModule } from '@angular/core';
import { SupportMapInfoPage } from './support-map-info.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [SharedModule, SupportMapInfoPage],
  exports: [SupportMapInfoPage],
})
export class SupportMapInfoPageModule {}
