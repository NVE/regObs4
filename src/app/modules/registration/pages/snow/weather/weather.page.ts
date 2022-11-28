import { Component } from '@angular/core';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage extends BasePage {
  windDirectionOptions: SelectOption[] = [
    { id: 0, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH' },
    { id: 45, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_EAST' },
    { id: 90, text: 'REGISTRATION.SNOW.WEATHER.FROM_EAST' },
    { id: 135, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_EAST' },
    { id: 180, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH' },
    { id: 225, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_WEST' },
    { id: 270, text: 'REGISTRATION.SNOW.WEATHER.FROM_WEST' },
    { id: 315, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_WEST' },
  ];

  constructor(basePageService: BasePageService, activatedRoute: ActivatedRoute) {
    super(RegistrationTid.WeatherObservation, basePageService, activatedRoute);
  }
}
