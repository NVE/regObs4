import { Component, OnInit } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage extends BasePage {

  windDirectionArray = [
    { val: null, name: 'REGISTRATION.SNOW.WEATHER.NOT_GIVEN' },
    { val: 0, name: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH', shortName: 'N' },
    { val: 45, name: 'REGISTRATION.SNOW.WEATHER.FROM_NOTRH_EAST', shortName: 'NØ' },
    { val: 90, name: 'REGISTRATION.SNOW.WEATHER.FROM_EAST', shortName: 'Ø' },
    { val: 135, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_EAST', shortName: 'SØ' },
    { val: 180, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH', shortName: 'S' },
    { val: 225, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_WEST', shortName: 'SV' },
    { val: 270, name: 'REGISTRATION.SNOW.WEATHER.FROM_WEST', shortName: 'V' },
    { val: 315, name: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_WEST', shortName: 'NV' }
  ];

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.WeatherObservation, basePageService, activatedRoute);
  }

  onBeforeLeave() {
    if (this.registration.WeatherObservation.AirTemperature !== undefined) {
      this.registration.WeatherObservation.AirTemperature =
        Math.round(this.registration.WeatherObservation.AirTemperature * 10) / 10.0;
    }
    if (this.registration.WeatherObservation.WindSpeed !== undefined) {
      this.registration.WeatherObservation.WindSpeed =
        Math.round(this.registration.WeatherObservation.WindSpeed * 10) / 10.0;
    }
    if (this.registration.WeatherObservation.CloudCover !== undefined) {
      if (this.registration.WeatherObservation.CloudCover > 100) {
        this.registration.WeatherObservation.CloudCover = 100;
      } else if (this.registration.WeatherObservation.CloudCover < 0) {
        this.registration.WeatherObservation.CloudCover = 0;
      } else {
        this.registration.WeatherObservation.CloudCover = Math.round(this.registration.WeatherObservation.CloudCover);
      }
    }
  }

}
