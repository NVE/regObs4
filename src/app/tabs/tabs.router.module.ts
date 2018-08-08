import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { TripPage } from '../trip/trip.page';
import { MyObservationsPage } from '../my-observations/my-observations.page';
import { VarsomPage } from '../varsom/varsom.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
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
        path: 'my-observations',
        outlet: 'my-observations',
        component: MyObservationsPage
      },
      {
        path: 'varsom',
        outlet: 'varsom',
        component: VarsomPage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
