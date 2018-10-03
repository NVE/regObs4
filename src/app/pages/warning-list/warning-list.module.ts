import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WarningListPage } from './warning-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { CapListGroupComponent } from '../../components/cap-list-group/cap-list-group.component';
import { SharedModule } from '../../modules/shared/shared.module';

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
    SharedModule,
  ],
  declarations: [WarningListPage, CapListGroupComponent]
})
export class WarningListPageModule { }
