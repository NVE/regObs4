import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { StartWizardGuard } from '../../core/guards/start-wizard.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [StartWizardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'home',
        redirectTo: '',
      },
      {
        path: 'trip',
        loadChildren: () => import('../trip/trip.module').then((m) => m.TripPageModule),
      },
      {
        path: 'observation-list',
        loadChildren: () =>
          import('../observation-list/observation-list.module').then((m) => m.ObservationListPageModule),
      },
      {
        path: 'warning-list',
        loadChildren: () => import('../warning-list/warning-list.module').then((m) => m.WarningListPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
