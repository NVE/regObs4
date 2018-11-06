import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegobsApiModule } from '../regobs-api/regobs-api.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateRouteGuard } from './pages/can-deactivate-route.guard';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    RegobsApiModule,
    SharedModule,
  ],
  exports: [
  ],
  declarations: [],
  providers: [CanDeactivateRouteGuard]
})
export class RegistrationModule { }
