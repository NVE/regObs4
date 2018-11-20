import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { TripPageModule } from '../trip/trip.module';
import { TranslateModule } from '@ngx-translate/core';
import { WarningListPageModule } from '../warning-list/warning-list.module';
import { ObservationListPageModule } from '../observation-list/observation-list.module';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    TripPageModule,
    WarningListPageModule,
    TranslateModule,
    ObservationListPageModule,
    SharedModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
