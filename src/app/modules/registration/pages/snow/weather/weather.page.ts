import { Component, OnInit } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { NumberHelper } from '../../../../../core/helpers/number-helper';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage extends BasePage {

  windDirectionArray = [
    { val: null, name: 'REGISTRATION.SNOW.WEATHER.NOT_GIVEN' },
    { val: 0, name: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH', shortName: 'DIRECTION.N' },
    { val: 45, name: 'REGISTRATION.SNOW.WEATHER.FROM_NOTRH_EAST', shortName: 'DIRECTION.NE' },
    { val: 90, name: 'REGISTRATION.SNOW.WEATHER.FROM_EAST', shortName: 'DIRECTION.E' },
    { val: 135, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_EAST', shortName: 'DIRECTION.SE' },
    { val: 180, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH', shortName: 'DIRECTION.S' },
    { val: 225, name: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_WEST', shortName: 'DIRECTION.SW' },
    { val: 270, name: 'REGISTRATION.SNOW.WEATHER.FROM_WEST', shortName: 'DIRECTION.W' },
    { val: 315, name: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_WEST', shortName: 'DIRECTION.NW' }
  ];

  airTemperatureMin = -150;
  airTemperatureMax = 60;
  windSpeedMin = 0;
  windSpeedMax = 50;
  cloudCoverMin = 0;
  cloudCoverMax = 100;

  get airTemratureValid() {
    return NumberHelper.isValid(
      this.registration.request.WeatherObservation.AirTemperature,
      this.airTemperatureMin,
      this.airTemperatureMax);
  }

  get windSpeedValid() {
    return NumberHelper.isValid(
      this.registration.request.WeatherObservation.WindSpeed,
      this.windSpeedMin,
      this.windSpeedMax);
  }

  get cloudCoverValid() {
    return NumberHelper.isValid(
      this.registration.request.WeatherObservation.CloudCover,
      this.cloudCoverMin,
      this.cloudCoverMax, false, true);
  }

  get inputTypeDecimal() {
    return this.platform.is('ios') ? 'tel' : 'number';
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private platform: Platform,
  ) {
    super(RegistrationTid.WeatherObservation, basePageService, activatedRoute);
  }

  isValid() {
    return this.airTemratureValid && this.windSpeedValid && this.cloudCoverValid;
  }

  onBeforeLeave() {
    if (this.registration.request.WeatherObservation.AirTemperature !== undefined) {
      this.registration.request.WeatherObservation.AirTemperature =
        Math.round(this.registration.request.WeatherObservation.AirTemperature * 10) / 10.0;
    }
    if (this.registration.request.WeatherObservation.WindSpeed !== undefined) {
      this.registration.request.WeatherObservation.WindSpeed =
        Math.round(this.registration.request.WeatherObservation.WindSpeed * 10) / 10.0;
    }
    if (this.registration.request.WeatherObservation.CloudCover !== undefined) {
      if (this.registration.request.WeatherObservation.CloudCover > 100) {
        this.registration.request.WeatherObservation.CloudCover = 100;
      } else if (this.registration.request.WeatherObservation.CloudCover < 0) {
        this.registration.request.WeatherObservation.CloudCover = 0;
      } else {
        this.registration.request.WeatherObservation.CloudCover = Math.round(this.registration.request.WeatherObservation.CloudCover);
      }
    }
  }

}
