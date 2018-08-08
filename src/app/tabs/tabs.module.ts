import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { TripPageModule } from '../trip/trip.module';
import { TranslateModule } from '@ngx-translate/core';
import { MyObservationsPageModule } from '../my-observations/my-observations.module';
import { VarsomPageModule } from '../varsom/varsom.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    TripPageModule,
    VarsomPageModule,
    TranslateModule,
    MyObservationsPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
