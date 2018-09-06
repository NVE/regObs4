import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WarningListPage } from './warning-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { RegionSummaryItemComponent } from '../../components/region-summary-item/region-summary-item.component';

const routes: Routes = [
  {
    path: '',
    component: WarningListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  declarations: [WarningListPage, RegionSummaryItemComponent]
})
export class WarningListPageModule { }
