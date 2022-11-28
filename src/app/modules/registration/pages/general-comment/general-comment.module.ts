import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralCommentPage } from './general-comment.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { AddWebUrlModalPageModule } from '../add-web-url-modal/add-web-url-modal.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralCommentPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddWebUrlModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneralCommentPage]
})
export class GeneralCommentPageModule {}
