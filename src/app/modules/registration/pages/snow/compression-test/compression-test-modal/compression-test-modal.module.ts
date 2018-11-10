import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../../../shared-components.module';
import { CompressionTestModalPage } from './compression-test-modal.page';

@NgModule({
    imports: [
        SharedComponentsModule
    ],
    declarations: [CompressionTestModalPage],
    entryComponents: [CompressionTestModalPage]
})
export class CompressionTestModalPageModule { }
