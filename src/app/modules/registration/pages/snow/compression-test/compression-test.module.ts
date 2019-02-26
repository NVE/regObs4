import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompressionTestPage } from './compression-test.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { CompressionTestModalPageModule } from './compression-test-modal/compression-test-modal.module';

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
export class CompressionTestPageModule { }
