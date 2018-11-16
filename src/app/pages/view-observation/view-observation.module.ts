import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewObservationPage } from './view-observation.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { FullscreenImageModalPageModule } from '../fullscreen-image-modal/fullscreen-image-modal.module';

const routes: Routes = [
  {
    path: '',
    component: ViewObservationPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FullscreenImageModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewObservationPage]
})
export class ViewObservationPageModule { }
