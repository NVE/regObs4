import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyObservationsPage } from './my-observations.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { SharedComponentsModule } from '../../modules/registration/shared-components.module';
import { FullscreenImageModalPageModule } from '../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SyncItemComponent } from './components/sync-item/sync-item.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { SentListComponent } from './components/sent-list/sent-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyObservationsPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    FullscreenImageModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyObservationsPage,
    SyncItemComponent,
    DraftListComponent,
    SentListComponent
  ]
})
export class MyObservationsPageModule {}
