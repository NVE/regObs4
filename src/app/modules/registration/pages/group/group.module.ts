import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupPage } from './group.page';
import { SharedModule } from '../../../shared/shared.module';
import { SaveAndGoBackButtonComponent } from '../../components/save-and-go-back-button/save-and-go-back-button.component';

const routes: Routes = [
  {
    path: '',
    component: GroupPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupPage, SaveAndGoBackButtonComponent]
})
export class GroupPageModule { }
