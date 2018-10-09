import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSearchPage } from './modal-search.page';
import { StartsWithHighlightPipe } from '../../core/pipes/starts-with-highlight.pipe';

const routes: Routes = [
  {
    path: '',
    component: ModalSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalSearchPage, StartsWithHighlightPipe]
})
export class ModalSearchPageModule { }
