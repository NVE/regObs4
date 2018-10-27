import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DamagePage } from './damage.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: DamagePage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DamagePage]
})
export class DamagePageModule { }
