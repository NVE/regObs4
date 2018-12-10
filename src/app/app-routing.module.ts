import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  },
  {
    path: 'my-observations',
    loadChildren: './pages/my-observations/my-observations.module#MyObservationsPageModule'
  },
  {
    path: 'user-settings',
    loadChildren: './pages/user-settings/user-settings.module#UserSettingsPageModule'
  },
  { path: 'trip-log', loadChildren: './pages/trip-log/trip-log.module#TripLogPageModule' },
  { path: 'start-wizard', loadChildren: './pages/start-wizard/start-wizard.module#StartWizardPageModule' },
  { path: 'view-observation/:id', loadChildren: './pages/view-observation/view-observation.module#ViewObservationPageModule' },
  { path: 'observation-list', loadChildren: './pages/observation-list/observation-list.module#ObservationListPageModule' },
  { path: 'offline-map', loadChildren: './pages/offline-map/offline-map.module#OfflineMapPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'registration',
    loadChildren: 'app/modules/registration/registration.module#RegistrationModule'
  },  { path: 'lagacy-trip', loadChildren: './pages/lagacy-trip/lagacy-trip.module#LagacyTripPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
