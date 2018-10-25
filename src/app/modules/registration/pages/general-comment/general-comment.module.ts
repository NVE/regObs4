import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralCommentPage } from './general-comment.page';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralCommentPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneralCommentPage]
})
export class GeneralCommentPageModule { }
