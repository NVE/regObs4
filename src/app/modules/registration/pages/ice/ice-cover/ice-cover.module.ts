import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IceCoverPage } from './ice-cover.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: IceCoverPage,
  },
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [IceCoverPage],
})
export class IceCoverPageModule {}
