import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterLevelPage } from './water-level.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { WaterLevelMeasurementComponent } from '../../../components/water/water-level-measurement/water-level-measurement.component';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: WaterLevelPage,
    canDeactivate: [CanDeactivateRouteGuard]
  }
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [WaterLevelPage, WaterLevelMeasurementComponent]
})
export class WaterLevelPageModule {}
