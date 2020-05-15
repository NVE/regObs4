import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'my-observations',
    loadChildren: () => import('./pages/my-observations/my-observations.module').then(m => m.MyObservationsPageModule)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./pages/user-settings/user-settings.module').then(m => m.UserSettingsPageModule)
  },
  { path: 'trip-log', loadChildren: () => import('./pages/trip-log/trip-log.module').then(m => m.TripLogPageModule) },
  { path: 'start-wizard', loadChildren: () => import('./pages/start-wizard/start-wizard.module').then(m => m.StartWizardPageModule) },
  { path: 'view-observation/:id', loadChildren: () => import('./pages/view-observation/view-observation.module').then(m => m.ViewObservationPageModule) },
  { path: 'observation-list', loadChildren: () => import('./pages/observation-list/observation-list.module').then(m => m.ObservationListPageModule) },
  { path: 'offline-map', loadChildren: () => import('./pages/offline-map/offline-map.module').then(m => m.OfflineMapPageModule) },
  { path: 'login', loadChildren: () => import('app/modules/login/login.module').then(m => m.LoginModule) },
  {
    path: 'registration',
    loadChildren: () => import('app/modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  { path: 'legacy-trip', loadChildren: () => import('./pages/legacy-trip/legacy-trip.module').then(m => m.LegacyTripPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
