import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservationListPage } from './observation-list.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { FullscreenImageModalPageModule } from '../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module';

const routes: Routes = [
  {
    path: '',
    component: ObservationListPage
  }
];

@NgModule({
  imports: [
    FullscreenImageModalPageModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObservationListPage]
})
export class ObservationListPageModule {}
