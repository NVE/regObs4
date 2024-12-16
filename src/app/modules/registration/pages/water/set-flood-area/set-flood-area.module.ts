import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SetFloodAreaPage } from './set-flood-area.page';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SetFloodAreaPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
    SetFloodAreaPage,
  ],
})
export class SetFloodAreaPageModule {}
