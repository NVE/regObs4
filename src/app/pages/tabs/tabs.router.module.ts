import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { StartWizardGuard } from '../../core/guards/start-wizard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [StartWizardGuard],
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'trip',
        children: [
          {
            path: '',
            loadChildren: '../trip/trip.module#TripPageModule'
          }
        ]
      },
      {
        path: 'observation-list',
        children: [
          {
            path: '',
            loadChildren: '../observation-list/observation-list.module#ObservationListPageModule'
          }
        ]
      },
      {
        path: 'warning-list',
        children: [
          {
            path: '',
            loadChildren: '../warning-list/warning-list.module#WarningListPageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
