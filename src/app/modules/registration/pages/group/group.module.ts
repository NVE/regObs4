import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupPage } from './group.page';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: GroupPage,
  },
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [GroupPage],
})
export class GroupPageModule {}
