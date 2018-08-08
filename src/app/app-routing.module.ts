import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'trip',
    loadChildren: './trip/trip.module#TripPageModule'
  },
  {
    path: 'my-observations',
    loadChildren: './my-observations/my-observations.module#MyObservationsPageModule'
  },
  { path: 'varsom', loadChildren: './varsom/varsom.module#VarsomPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
