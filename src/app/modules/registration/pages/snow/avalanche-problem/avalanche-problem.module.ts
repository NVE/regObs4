import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheProblemPage } from './avalanche-problem.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { AvalancheProblemModalPageModule } from './avalanche-problem-modal/avalanche-problem-modal.module';

const routes: Routes = [
  {
    path: '',
    component: AvalancheProblemPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AvalancheProblemModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvalancheProblemPage]
})
export class AvalancheProblemPageModule {}
