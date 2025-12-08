import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivateStartWizard } from '../../core/guards/start-wizard.guard';
import { desktopBlockGuard } from 'src/app/core/guards/desktop-block.guard';

/**
 * Ruter for navigasjon mellom faner nederst på skjermen
 */
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
        path: 'plans',
        loadComponent: () => import('../plans/plans.page').then((m) => m.PlansPage),
      },
      {
        path: 'plans/:id',
        loadComponent: () => import('../plans/plan/plan.page').then((m) => m.PlanPage),
      },
      // Redirect from old regobs.no route
      {
        path: 'observation/search',
        redirectTo: 'search',
      },
      // Support old route used in app
      {
        path: 'observation-list',
        redirectTo: 'search',
      },
    ],
  },
];
