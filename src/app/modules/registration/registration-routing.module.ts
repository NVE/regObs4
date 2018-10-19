import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/overview/overview.module#OverviewPageModule'
    },
    {
        path: 'registration/set-time',
        loadChildren: './pages/set-time/set-time.module#SetTimePageModule'
    },
    {
        path: 'registration/obs-location',
        loadChildren: './pages/obs-location/obs-location.module#ObsLocationPageModule'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
