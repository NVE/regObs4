import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { SharedComponentsModule } from '../../modules/registration/shared-components.module';
import { LegacyTripPage } from './legacy-trip.page';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LegacyTripPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LegacyTripPage]
})
export class LegacyTripPageModule {}
