import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TripLogPage } from './trip-log.page';
import { TranslateModule } from '@ngx-translate/core';
import { TripLogSummaryComponent } from '../../components/trip-log-summary/trip-log-summary.component';

const routes: Routes = [
  {
    path: '',
    component: TripLogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  declarations: [TripLogPage, TripLogSummaryComponent]
})
export class TripLogPageModule { }
