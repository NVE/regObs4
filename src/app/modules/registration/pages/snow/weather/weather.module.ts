import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherPage } from './weather.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: WeatherPage,
    canDeactivate: [CanDeactivateRouteGuard]
  }
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [WeatherPage]
})
export class WeatherPageModule {}
