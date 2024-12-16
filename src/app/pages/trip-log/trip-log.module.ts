import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TripLogPage } from './trip-log.page';
import { TranslateModule } from '@ngx-translate/core';
import { TripLogSummaryComponent } from '../../components/trip-log-summary/trip-log-summary.component';

const routes: Routes = [
  {
    path: '',
    component: TripLogPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    TripLogPage,
    TripLogSummaryComponent,
  ],
})
export class TripLogPageModule {}
