import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateRouteGuard } from './pages/can-deactivate-route.guard';
import { SaveAsDraftRouteGuard } from './pages/save-as-draft.guard';
import { RegobsApiModule } from 'src/app/modules/common-regobs-api';

@NgModule({
  imports: [RegistrationRoutingModule, RegobsApiModule, SharedModule],
  exports: [],
  declarations: [],
  providers: [CanDeactivateRouteGuard, SaveAsDraftRouteGuard],
})
export class RegistrationModule {}
