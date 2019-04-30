import { NgModule } from '@angular/core';
import { CompressionTestModalPage } from './compression-test-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';

@NgModule({
  imports: [
    SharedComponentsModule,
  ],
  declarations: [CompressionTestModalPage],
  entryComponents: [CompressionTestModalPage],
})
export class CompressionTestModalPageModule { }
