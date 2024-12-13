import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPage } from './weather.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { canDeactivateBasePageComponent } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: WeatherPage,
    canDeactivate: [canDeactivateBasePageComponent],
  },
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes), WeatherPage],
})
export class WeatherPageModule {}
