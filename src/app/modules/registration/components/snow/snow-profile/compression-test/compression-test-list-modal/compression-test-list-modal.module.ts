import { NgModule } from '@angular/core';
import { CompressionTestListModalPage } from './compression-test-list-modal.page';
import { SharedComponentsModule } from '../../../../../shared-components.module';
import { CompressionTestModalPageModule } from '../../../compression-test-list/compression-test-modal/compression-test-modal.module';

@NgModule({
  imports: [
    SharedComponentsModule,
    CompressionTestModalPageModule,
  ],
  declarations: [CompressionTestListModalPage],
  entryComponents: [CompressionTestListModalPage],
})
export class CompressionTestListModalPageModule { }
