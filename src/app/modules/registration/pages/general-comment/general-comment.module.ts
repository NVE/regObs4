import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralCommentPage } from './general-comment.page';
import { SharedModule } from '../../../shared/shared.module';
import { SaveAndGoBackButtonComponent } from '../../components/save-and-go-back-button/save-and-go-back-button.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralCommentPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneralCommentPage, SaveAndGoBackButtonComponent]
})
export class GeneralCommentPageModule { }
