import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivateStartWizard } from '../../core/guards/start-wizard.guard';
import { desktopBlockGuard } from 'src/app/core/guards/desktop-block.guard';

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
        path: 'search',
        loadComponent: () => import('../observation-list/list.page').then((m) => m.ObservationListPage),
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('../observation-list/observation-list/observation-list.component').then(
                (m) => m.ObservationListComponent
              ),
          },
          {
            path: 'pictures',
            loadComponent: () =>
              import('../observation-list/image-list/image-list.component').then((m) => m.ImageListComponent),
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'warning-list',
        loadComponent: () => import('../warning-list/warning-list.page').then((m) => m.WarningListPage),
        canActivate: [desktopBlockGuard],
      },
      {
        path: 'observation/search',
        redirectTo: 'search',
      },
      {
        path: 'observation-list',
        redirectTo: 'search',
      },
    ],
  },
];
