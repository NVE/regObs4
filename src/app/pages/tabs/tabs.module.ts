import { NgModule } from '@angular/core';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { TripPageModule } from '../trip/trip.module';
import { WarningListPageModule } from '../warning-list/warning-list.module';
import { ObservationListPageModule } from '../observation-list/observation-list.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { CoachMarksMainScreenComponent } from 'src/app/components/coach-marks/coach-marks-main-screen/coach-marks-main-screen.component';
import { SharedComponentsModule } from 'src/app/modules/registration/shared-components.module';

@NgModule({
  imports: [
    TabsPageRoutingModule,
    HomePageModule,
    TripPageModule,
    WarningListPageModule,
    ObservationListPageModule,
    SharedModule,
  ],
  declarations: [TabsPage, CoachMarksMainScreenComponent],
})
export class TabsPageModule {}
