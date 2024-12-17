import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivateStartWizard } from '../../core/guards/start-wizard.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [canActivateStartWizard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'home',
        redirectTo: '',
      },
      {
        path: 'trip',
        loadComponent: () => import('../trip/trip.page').then((m) => m.TripPage),
      },
      {
        path: 'observation-list',
        loadComponent: () => import('../observation-list/observation-list.page').then((m) => m.ObservationListPage),
      },
      {
        path: 'warning-list',
        loadComponent: () => import('../warning-list/warning-list.page').then((m) => m.WarningListPage),
      },
    ],
  },
];
