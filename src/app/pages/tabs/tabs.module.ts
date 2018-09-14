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
import { AddPageModule } from '../add/add.module';
import { ObservationListPageModule } from '../observation-list/observation-list.module';

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
    AddPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
