import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartWizardPage } from './start-wizard.page';
import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: StartWizardPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [StartWizardPage],
})
export class StartWizardPageModule {}
