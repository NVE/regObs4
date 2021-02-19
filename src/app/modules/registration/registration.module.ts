import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegobsApiModule } from '../regobs-api/regobs-api.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateRouteGuard } from './pages/can-deactivate-route.guard';
import { SaveAsDraftRouteGuard } from './pages/save-as-draft.guard';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    RegobsApiModule,
    SharedModule,
    NgxFileDropModule
  ],
  exports: [],
  declarations: [],
  providers: [CanDeactivateRouteGuard, SaveAsDraftRouteGuard]
})
export class RegistrationModule {}
