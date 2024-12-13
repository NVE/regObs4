import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsPage } from './user-settings.page';
import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), UserSettingsPage],
})
export class UserSettingsPageModule {}
