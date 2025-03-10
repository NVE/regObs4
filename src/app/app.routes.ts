import { Routes } from '@angular/router';
import { isUserLoggedIn } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    // Redirect tabs to '' for backwards compatibility agains old /tabs/home route etc.
    // Maybe not needed if we don't have any navigation to /tabs/home in our code.
    path: 'tabs',
    redirectTo: '',
  },
  {
    path: 'my-observations',
    loadComponent: () => import('./pages/my-observations/my-observations.page').then((m) => m.MyObservationsPage),
  },
  {
    path: 'user-settings',
    loadComponent: () => import('./pages/user-settings/user-settings.page').then((m) => m.UserSettingsPage),
  },
  {
    path: 'trip-log',
    loadComponent: () => import('./pages/trip-log/trip-log.page').then((m) => m.TripLogPage),
  },
  {
    path: 'start-wizard',
    loadComponent: () => import('./pages/start-wizard/start-wizard.page').then((m) => m.StartWizardPage),
  },
  {
    path: 'view-observation/:id',
    redirectTo: 'registration/:id',
  },

  // As this is defined in tabs.routes, try removing it from here..
  // {
  //   path: 'observation-list',
  //   loadComponent: () =>
  //     import('./pages/observation-list/observation-list.page').then((m) => m.ObservationListPage),
  // },
  {
    path: 'offline-map',
    loadComponent: () => import('./pages/offline-map/offline-map.page').then((m) => m.OfflineMapPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/pages/user-information/user-information.page').then((m) => m.UserInformation),
  },
  {
    path: 'start-registration/:geoHazard',
    redirectTo: 'registration/new/:geoHazard',
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.routes').then((m) => m.routes),
  },
  {
    path: 'Registration',
    redirectTo: 'registration',
  },
  {
    path: 'legacy-trip',
    loadComponent: () => import('./pages/legacy-trip/legacy-trip.page').then((m) => m.LegacyTripPage),
    canActivate: [isUserLoggedIn],
  },
  {
    path: 'obskorps',
    loadComponent: () => import('./pages/obskorps/obskorps.page').then((m) => m.ObskorpsPage),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./modules/auth/pages/auth-callback/auth-callback.page').then((m) => m.AuthCallbackPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
