import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    // Redirect tabs to '' for backwards compatibility agains old /tabs/home route etc.
    // Maybe not needed if we don't have any navigation to /tabs/home in our code.
    path: 'tabs',
    redirectTo: '',
  },
  {
    path: 'my-observations',
    loadChildren: () =>
      import('./pages/my-observations/my-observations.module').then((m) => m.MyObservationsPageModule),
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./pages/user-settings/user-settings.module').then((m) => m.UserSettingsPageModule),
  },
  {
    path: 'trip-log',
    loadChildren: () => import('./pages/trip-log/trip-log.module').then((m) => m.TripLogPageModule),
  },
  {
    path: 'start-wizard',
    loadChildren: () => import('./pages/start-wizard/start-wizard.module').then((m) => m.StartWizardPageModule),
  },
  {
    path: 'view-observation/:id',
    redirectTo: 'registration/:id',
  },
  {
    path: 'observation-list',
    loadChildren: () =>
      import('./pages/observation-list/observation-list.module').then((m) => m.ObservationListPageModule),
  },
  {
    path: 'offline-map',
    loadChildren: () => import('./pages/offline-map/offline-map.module').then((m) => m.OfflineMapPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/user-information.module').then((m) => m.UserInformationModule),
  },
  {
    path: 'start-registration/:geoHazard',
    redirectTo: 'registration/new/:geoHazard',
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'Registration',
    redirectTo: 'registration',
  },
  {
    path: 'legacy-trip',
    loadChildren: () => import('./pages/legacy-trip/legacy-trip.module').then((m) => m.LegacyTripPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
