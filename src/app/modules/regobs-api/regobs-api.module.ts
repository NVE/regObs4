/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RegobsApiConfiguration } from './regobs-api-configuration';

import { AccountService } from './services/account.service';
import { DangersignService } from './services/dangersign.service';
import { GeneralObsService } from './services/general-obs.service';
import { HelptextService } from './services/helptext.service';
import { KdvElementsService } from './services/kdv-elements.service';
import { LocationService } from './services/location.service';
import { RegistrationService } from './services/registration.service';
import { SearchService } from './services/search.service';
import { TokenService } from './services/token.service';
import { TripService } from './services/trip.service';

/**
 * Provider for all regobsApi services, plus RegobsApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    RegobsApiConfiguration,
    AccountService,
    DangersignService,
    GeneralObsService,
    HelptextService,
    KdvElementsService,
    LocationService,
    RegistrationService,
    SearchService,
    TokenService,
    TripService
  ],
})
export class RegobsApiModule { }
