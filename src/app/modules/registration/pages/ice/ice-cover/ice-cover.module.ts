import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IceCoverPage } from './ice-cover.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { AddWebUrlModalPageModule } from '../../add-web-url-modal/add-web-url-modal.module';

const routes: Routes = [
  {
    path: '',
    component: IceCoverPage,
  },
];

@NgModule({
  imports: [SharedComponentsModule, AddWebUrlModalPageModule, RouterModule.forChild(routes)],
  declarations: [IceCoverPage],
})
export class IceCoverPageModule {}
