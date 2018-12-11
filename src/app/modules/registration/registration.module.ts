import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegobsApiModule } from '../regobs-api/regobs-api.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateRouteGuard } from './pages/can-deactivate-route.guard';
import { LoginModalPageModule } from '../login/pages/modal-pages/login-modal/login-modal.module';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    RegobsApiModule,
    SharedModule,
    LoginModalPageModule,
  ],
  exports: [
    LoginModalPageModule
  ],
  declarations: [],
  providers: [CanDeactivateRouteGuard]
})
export class RegistrationModule { }
