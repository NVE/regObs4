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
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule)
          }
        ]
      },
      {
        path: 'trip',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../trip/trip.module').then((m) => m.TripPageModule)
          }
        ]
      },
      {
        path: 'observation-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../observation-list/observation-list.module').then(
                (m) => m.ObservationListPageModule
              )
          }
        ]
      },
      {
        path: 'warning-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../warning-list/warning-list.module').then(
                (m) => m.WarningListPageModule
              )
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
