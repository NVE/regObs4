import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../shared-components.module';
import { AddWebUrlModalPage } from './add-web-url-modal.page';

@NgModule({
  imports: [SharedComponentsModule],
  declarations: [AddWebUrlModalPage],
})
export class AddWebUrlModalPageModule {}
