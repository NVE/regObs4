import { Component, OnInit, ViewChild } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { NumericInputComponent } from '../../../components/numeric-input/numeric-input.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage extends BasePage {

  @ViewChild('airTemperature') airTemperature: NumericInputComponent;
  @ViewChild('windSpeed') windSpeed: NumericInputComponent;
  @ViewChild('cloudCover') cloudCover: NumericInputComponent;

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

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.WeatherObservation, basePageService, activatedRoute);
  }

  isValid() {
    return this.airTemperature.isValid && this.windSpeed.isValid && this.cloudCover.isValid;
  }

  onBeforeLeave() {
    this.registration.request.WeatherObservation.AirTemperature = this.airTemperature.getValue();
    this.registration.request.WeatherObservation.WindSpeed = this.windSpeed.getValue();
    this.registration.request.WeatherObservation.CloudCover = this.cloudCover.getValue();
  }

}
