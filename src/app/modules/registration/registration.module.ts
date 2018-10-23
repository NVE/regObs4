import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegobsApiModule } from '../regobs-api/regobs-api.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    RegobsApiModule,
    SharedModule,
  ],
  exports: [

  ],
  declarations: []
})
export class RegistrationModule { }
