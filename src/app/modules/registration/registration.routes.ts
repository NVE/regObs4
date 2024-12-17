import { Routes } from '@angular/router';
import { saveAsDraftGuard } from './pages/save-as-draft.guard';
import { canDeactivateBasePageComponent } from './pages/can-deactivate-route.guard';

export const routes: Routes = [
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/overview/overview.page').then((m) => m.OverviewPage),
    canDeactivate: [saveAsDraftGuard],
  },
  {
    path: 'new/:geoHazard',
    loadComponent: () => import('./pages/obs-location/obs-location.page').then((m) => m.ObsLocationPage),
    canDeactivate: [saveAsDraftGuard],
  },
  {
    path: 'obs-location/:id',
    loadComponent: () => import('./pages/obs-location/obs-location.page').then((m) => m.ObsLocationPage),
    canDeactivate: [saveAsDraftGuard],
  },
  {
    path: 'group/:id',
    loadComponent: () => import('./pages/group/group.page').then((m) => m.GroupPage),
  },
  {
    path: 'general-comment/:id',
    loadComponent: () => import('./pages/general-comment/general-comment.page').then((m) => m.GeneralCommentPage),
  },
  {
    path: 'ice/ice-cover/:id',
    loadComponent: () => import('./pages/ice/ice-cover/ice-cover.page').then((m) => m.IceCoverPage),
  },
  {
    path: 'ice/ice-thickness/:id',
    loadComponent: () => import('./pages/ice/ice-thickness/ice-thickness.page').then((m) => m.IceThicknessPage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'dirt/landslide-obs/:id',
    loadComponent: () => import('./pages/dirt/landslide-obs/landslide-obs.page').then((m) => m.LandslideObsPage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'danger-obs/:id',
    loadComponent: () => import('./pages/danger-obs/danger-obs.page').then((m) => m.DangerObsPage),
  },
  {
    path: 'incident/:id',
    loadComponent: () => import('./pages/incident/incident.page').then((m) => m.IncidentPage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'snow/avalanche-obs/:id',
    loadComponent: () => import('./pages/snow/avalanche-obs/avalanche-obs.page').then((m) => m.AvalancheObsPage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'snow/avalanche-activity/:id',
    loadComponent: () =>
      import('./pages/snow/avalanche-activity/avalanche-activity.page').then((m) => m.AvalancheActivityPage),
  },
  {
    path: 'snow/weather/:id',
    loadComponent: () => import('./pages/snow/weather/weather.page').then((m) => m.WeatherPage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'snow/snow-surface/:id',
    loadComponent: () => import('./pages/snow/snow-surface/snow-surface.page').then((m) => m.SnowSurfacePage),
    canDeactivate: [canDeactivateBasePageComponent],
  },
  {
    path: 'snow/snow-profile/:id',
    loadComponent: () => import('./pages/snow/snow-profile/snow-profile.page').then((m) => m.SnowProfilePage),
  },
  {
    path: 'snow/compression-test/:id',
    loadComponent: () =>
      import('./pages/snow/compression-test/compression-test.page').then((m) => m.CompressionTestPage),
  },
  {
    path: 'snow/avalanche-problem/:id',
    loadComponent: () =>
      import('./pages/snow/avalanche-problem/avalanche-problem.page').then((m) => m.AvalancheProblemPage),
  },
  {
    path: 'snow/avalanche-evaluation/:id',
    loadComponent: () =>
      import('./pages/snow/avalanche-evaluation/avalanche-evaluation.page').then((m) => m.AvalancheEvaluationPage),
  },
  {
    path: 'water/set-flood-area/:id',
    loadComponent: () => import('./pages/water/set-flood-area/set-flood-area.page').then((m) => m.SetFloodAreaPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/pages/view-observation/view-observation.page').then((m) => m.ViewObservationPage),
  },
];
