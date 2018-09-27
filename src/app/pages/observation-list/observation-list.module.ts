import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservationListPage } from './observation-list.page';
import { ObservationListCardComponent } from '../../components/observation/observation-list-card/observation-list-card.component';
import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ObservationListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObservationListPage, ObservationListCardComponent]
})
export class ObservationListPageModule { }
