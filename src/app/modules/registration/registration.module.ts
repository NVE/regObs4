import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegobsApiModule } from 'src/app/modules/common-regobs-api';

@NgModule({
  imports: [RegistrationRoutingModule, RegobsApiModule, SharedModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class RegistrationModule {}
