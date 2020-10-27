import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'registration/edit/:id',
    loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewPageModule)
  },
  {
    path: 'registration/set-time/:id',
    loadChildren: () => import('./pages/set-time/set-time.module').then(m => m.SetTimePageModule)
  },
  {
    path: 'registration/new/:geoHazard',
    loadChildren: () => import('./pages/obs-location/obs-location.module').then(m => m.ObsLocationPageModule)
  },
  {
    path: 'registration/obs-location/:id',
    loadChildren: () => import('./pages/obs-location/obs-location.module').then(m => m.ObsLocationPageModule)
  },
  {
    path: 'registration/group/:id',
    loadChildren: () => import('./pages/group/group.module').then(m => m.GroupPageModule)
  },
  {
    path: 'registration/general-comment/:id',
    loadChildren: () => import('./pages/general-comment/general-comment.module').then(m => m.GeneralCommentPageModule)
  },
  {
    path: 'registration/water/water-level/:id',
    loadChildren: () => import('./pages/water/water-level/water-level.module').then(m => m.WaterLevelPageModule)
  },
  {
    path: 'registration/water/damage/:id',
    loadChildren: () => import('./pages/water/damage/damage.module').then(m => m.DamagePageModule)
  },
  {
    path: 'registration/ice/ice-cover/:id',
    loadChildren: () => import('./pages/ice/ice-cover/ice-cover.module').then(m => m.IceCoverPageModule)
  },
  {
    path: 'registration/ice/ice-thickness/:id',
    loadChildren: () => import('./pages/ice/ice-thickness/ice-thickness.module').then(m => m.IceThicknessPageModule)
  },
  {
    path: 'registration/dirt/landslide-obs/:id',
    loadChildren: () => import('./pages/dirt/landslide-obs/landslide-obs.module').then(m => m.LandslideObsPageModule),
  },
  {
    path: 'registration/danger-obs/:id',
    loadChildren: () => import('./pages/danger-obs/danger-obs.module').then(m => m.DangerObsPageModule)
  },
  {
    path: 'registration/incident/:id',
    loadChildren: () => import('./pages/incident/incident.module').then(m => m.IncidentPageModule)
  },
  {
    path: 'registration/snow/avalanche-obs/:id',
    loadChildren: () => import('./pages/snow/avalanche-obs/avalanche-obs.module').then(m => m.AvalancheObsPageModule)
  },
  {
    path: 'registration/snow/avalanche-activity/:id',
    loadChildren: () => import('./pages/snow/avalanche-activity/avalanche-activity.module').then(m => m.AvalancheActivityPageModule)
  },
  {
    path: 'registration/snow/weather/:id',
    loadChildren: () => import('./pages/snow/weather/weather.module').then(m => m.WeatherPageModule)
  },
  {
    path: 'registration/snow/snow-surface/:id',
    loadChildren: () => import('./pages/snow/snow-surface/snow-surface.module').then(m => m.SnowSurfacePageModule)
  },
  {
    path: 'registration/snow/snow-profile/:id',
    loadChildren: () => import('./pages/snow/snow-profile/snow-profile.module').then(m => m.SnowProfilePageModule)
  },
  {
    path: 'registration/snow/compression-test/:id',
    loadChildren: () => import('./pages/snow/compression-test/compression-test.module').then(m => m.CompressionTestPageModule)
  },
  {
    path: 'registration/snow/avalanche-problem/:id',
    loadChildren: () => import('./pages/snow/avalanche-problem/avalanche-problem.module').then(m => m.AvalancheProblemPageModule)
  },
  {
    path: 'registration/snow/avalanche-evaluation/:id',
    loadChildren: () => import('./pages/snow/avalanche-evaluation/avalanche-evaluation.module').then(m => m.AvalancheEvaluationPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
