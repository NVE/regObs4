import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnowProfilePage } from './snow-profile.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SnowProfilePage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SnowProfilePage]
})
export class SnowProfilePageModule { }
