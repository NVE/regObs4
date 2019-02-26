import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentPage } from './incident.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { AddWebUrlModalPageModule } from '../add-web-url-modal/add-web-url-modal.module';

const routes: Routes = [
  {
    path: '',
    component: IncidentPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddWebUrlModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncidentPage]
})
export class IncidentPageModule { }
