import { NgModule } from '@angular/core';
import { SideMenuComponent } from './components/side-menu.component';
import { SupportTilesMenuComponent } from './components/support-tiles-menu/support-tiles-menu.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ObservationsDaysBackComponent } from './components/observations-days-back/observations-days-back.component';
import { UpdateObservationsComponent } from './components/update-observations/update-observations.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SideMenuComponent,
    SupportTilesMenuComponent,
    UserLoginComponent,
    ObservationsDaysBackComponent,
    UpdateObservationsComponent
  ],
  exports: [
    SideMenuComponent,
  ]
})
export class SideMenuModule { }
