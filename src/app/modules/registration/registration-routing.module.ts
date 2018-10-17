import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    //   {
    //     path: '',
    //     loadChildren: './pages/create.module#CreateRegistrationPageModule'
    //   },
    {
        path: '',
        loadChildren: './pages/set-time/set-time.module#SetTimePageModule'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
