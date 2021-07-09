import { NgModule } from '@angular/core';
import { SideMenuComponent } from './components/side-menu.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { SupportTilesMenuComponent } from './components/support-tiles-menu/support-tiles-menu.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ObservationsDaysBackComponent } from './components/observations-days-back/observations-days-back.component';
import { UpdateObservationsComponent } from './components/update-observations/update-observations.component';
import { SharedModule } from '../shared/shared.module';
import { SupportTileLegendLoaderComponent } from './components/support-tiles-menu/legends/support-tile-legend-loader/support-tile-legend-loader.component';
import { SteepnessLegendComponent } from './components/support-tiles-menu/legends/steepness-legend/steepness-legend.component';
import { FloodzonesLegendComponent } from './components/support-tiles-menu/legends/floodzones-legend/floodzones-legend.component';
import { ClayzonesLegendComponent } from './components/support-tiles-menu/legends/clayzones-legend/clayzones-legend.component';
import { WeakenediceLegendComponent } from './components/support-tiles-menu/legends/weakenedice-legend/weakenedice-legend.component';
import { SteepnessOutletLegendComponent } from './components/support-tiles-menu/legends/steepness-outlet-legend/steepness-outlet-legend.component';
import { SteepnessCommonLegendComponent } from './components/support-tiles-menu/legends/steepness-common-legend/steepness-common-legend.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    SideMenuComponent,
    FilterMenuComponent,
    SupportTilesMenuComponent,
    UserLoginComponent,
    ObservationsDaysBackComponent,
    UpdateObservationsComponent,
    SupportTileLegendLoaderComponent,
    SteepnessLegendComponent,
    FloodzonesLegendComponent,
    ClayzonesLegendComponent,
    WeakenediceLegendComponent,
    SteepnessOutletLegendComponent,
    SteepnessCommonLegendComponent
  ],
  entryComponents: [
    SteepnessLegendComponent,
    FloodzonesLegendComponent,
    ClayzonesLegendComponent,
    WeakenediceLegendComponent,
    SteepnessOutletLegendComponent
  ],
  exports: [SideMenuComponent, FilterMenuComponent]
})
export class SideMenuModule {}
