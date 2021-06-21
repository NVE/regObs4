import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineMapPage } from './offline-map.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: OfflineMapPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [OfflineMapPage]
})
export class OfflineMapPageModule {}
