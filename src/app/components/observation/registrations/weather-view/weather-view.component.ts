import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { injectKdv } from 'src/app/modules/common-registration/services/kdv/inject-kdv';
import { WeatherViewModel } from 'src/app/modules/common-regobs-api';
import { KeyValueComponent } from '../../key-value/key-value.component';

@Component({
  selector: 'app-weather-view',
  imports: [TranslatePipe, KeyValueComponent],
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Viser en værobservasjon i observasjonskort og på detaljside for observasjon */
export class WeatherViewComponent {
  data = input.required<WeatherViewModel>();

  private weatherPhenomenonKdv = injectKdv('Weather_WeatherPhenomenonKDV');
  private weatherPhenomenonTid = computed(() => this.data().WeatherPhenomenonTID);
  weatherPhenomenon = this.weatherPhenomenonKdv.getName(this.weatherPhenomenonTid);

  airTemperature = computed(() => this.data().AirTemperature);
  cloudCover = computed(() => this.data().CloudCover);
  comment = computed(() => this.data().Comment);
  precipitation = computed(() => {
    const { PrecipitationTID, PrecipitationName } = this.data();
    if (PrecipitationTID) {
      return PrecipitationName;
    }
    return undefined;
  });
  consequence = computed(() => this.data().Consequence);

  windDirection = computed(() => {
    const direction = this.data().WindDirection;
    return typeof direction === 'number' ? direction + 180 : null;
  });
  windDirectionName = computed(() => this.data().WindDirectionName);
  windSpeed = computed(() => this.data().WindSpeed);

  forecastCorrect = computed(() => {
    if (this.data().ForecastCorrectTID) {
      return this.data().ForecastCorrectName;
    }
    return null;
  });
}
