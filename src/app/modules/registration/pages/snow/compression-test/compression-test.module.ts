import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompressionTestPage } from './compression-test.page';
import { SharedComponentsModule } from '../../../shared-components.module';
// tslint:disable-next-line:max-line-length
import { CompressionTestModalPageModule } from '../../../components/snow/compression-test-list/compression-test-modal/compression-test-modal.module';

const routes: Routes = [
  {
    path: '',
    component: CompressionTestPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    CompressionTestModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompressionTestPage]
})
export class CompressionTestPageModule {}
