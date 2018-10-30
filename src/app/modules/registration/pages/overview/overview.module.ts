import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPage } from './overview.page';
import { SharedModule } from '../../../shared/shared.module';
import { SendButtonComponent } from '../../components/send-button/send-button.component';
import { SummaryItemComponent } from '../../components/summary-item/summary-item.component';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: OverviewPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OverviewPage, SendButtonComponent, SummaryItemComponent]
})
export class OverviewPageModule { }
