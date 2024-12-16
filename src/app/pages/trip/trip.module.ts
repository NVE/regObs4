import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TripPage } from './trip.page';

const routes: Routes = [
  {
    path: '',
    component: TripPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule, TripPage],
})
export class TripPageModule {}
