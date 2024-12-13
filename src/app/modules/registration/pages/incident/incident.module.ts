import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentPage } from './incident.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { AddWebUrlModalPageModule } from '../add-web-url-modal/add-web-url-modal.module';
import { RegistrationModule } from '../../registration.module';
import { canDeactivateBasePageComponent } from '../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: IncidentPage,
    canDeactivate: [canDeactivateBasePageComponent],
  },
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddWebUrlModalPageModule,
    RouterModule.forChild(routes),
    RegistrationModule,
    IncidentPage,
  ],
})
export class IncidentPageModule {}
