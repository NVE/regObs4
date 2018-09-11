import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObservationListPage } from './observation-list.page';
import { ObservationListCardComponent } from '../../components/observation/observation-list-card/observation-list-card.component';

const routes: Routes = [
  {
    path: '',
    component: ObservationListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObservationListPage, ObservationListCardComponent]
})
export class ObservationListPageModule { }
