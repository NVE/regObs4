import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetDamageLocationPage } from './set-damage-location.page';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SetDamageLocationPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetDamageLocationPage]
})
export class SetDamageLocationPageModule { }
