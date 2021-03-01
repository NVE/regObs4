import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheEvaluationPage } from './avalanche-evaluation.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: AvalancheEvaluationPage
  }
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [AvalancheEvaluationPage]
})
export class AvalancheEvaluationPageModule {}
