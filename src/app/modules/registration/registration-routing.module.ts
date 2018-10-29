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
    { path: 'registration/group', loadChildren: './pages/group/group.module#GroupPageModule' },
    { path: 'registration/general-comment', loadChildren: './pages/general-comment/general-comment.module#GeneralCommentPageModule' },
    { path: 'registration/water/water-level', loadChildren: './pages/water/water-level/water-level.module#WaterLevelPageModule' },
    { path: 'registration/water/damage', loadChildren: './pages/water/damage/damage.module#DamagePageModule' },
    {
        path: 'registration/set-damage-location/:damageTypeTid',
        loadChildren: './pages/set-damage-location/set-damage-location.module#SetDamageLocationPageModule'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
