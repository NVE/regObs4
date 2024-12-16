import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInformation } from './user-information.page';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserInformation,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), UserInformation],
})
export class UserInformationModule {}
