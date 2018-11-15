import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { TripPage } from '../trip/trip.page';
import { WarningListPage } from '../warning-list/warning-list.page';
import { AddPage } from '../add/add.page';
import { ObservationListPage } from '../observation-list/observation-list.page';
import { StartWizardGuard } from '../../core/gurads/start-wizard-guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [StartWizardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'trip',
        outlet: 'trip',
        component: TripPage
      },
      {
        path: 'add',
        outlet: 'add',
        component: AddPage
      },
      {
        path: 'observation-list',
        outlet: 'observation-list',
        component: ObservationListPage
      },
      {
        path: 'warning-list',
        outlet: 'warning-list',
        component: WarningListPage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
