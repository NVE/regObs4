import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivateStartWizard } from '../../core/guards/start-wizard.guard';
import { desktopBlockGuard } from 'src/app/core/guards/desktop-block.guard';
import { TABS } from './tabs.service';

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
        path: TABS.HOME,
        redirectTo: '',
      },
      {
        path: 'trip',
        loadComponent: () => import('../trip/trip.page').then((m) => m.TripPage),
      },
      {
        path: TABS.OBSERVATION_LIST,
        loadComponent: () =>
          import('../observation-list/observation-list/observation-list.component').then(
            (m) => m.ObservationListComponent
          ),
      },
      {
        path: TABS.IMAGES,
        loadComponent: () =>
          import('../observation-list/image-list/image-list.component').then((m) => m.ImageListComponent),
      },
      {
        path: TABS.WARNING_LIST,
        loadComponent: () => import('../warning-list/warning-list.page').then((m) => m.WarningListPage),
        canActivate: [desktopBlockGuard],
      },
      // Redirect from old regobs.no route
      {
        path: 'observation/search',
        redirectTo: TABS.OBSERVATION_LIST,
      },
      // Support old route used in app
      {
        path: 'search/list',
        redirectTo: TABS.OBSERVATION_LIST,
      },
      {
        path: 'search/pictures',
        redirectTo: TABS.IMAGES,
      },
      {
        path: 'observation-list',
        redirectTo: TABS.OBSERVATION_LIST,
      },
      {
        path: 'search',
        redirectTo: TABS.OBSERVATION_LIST,
      },
    ],
  },
];
