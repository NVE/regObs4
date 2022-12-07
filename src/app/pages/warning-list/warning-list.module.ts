import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WarningListPage } from './warning-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { WarningListHeaderComponent } from '../../components/warning-list-header/warning-list-header.component';
import { WarningListItemComponent } from '../../components/warning-list-item/warning-list-item.component';
// tslint:disable-next-line:max-line-length
import { WarningGroupFavouriteToggleComponent } from '../../components/warning-group-favourite-toggle/warning-group-favourite-toggle.component';
import { AbonnerBannerComponent } from './abonner-banner/abonner-banner.component';

const routes: Routes = [
  {
    path: '',
    component: WarningListPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), TranslateModule, SharedModule],
  declarations: [
    WarningListPage,
    WarningListHeaderComponent,
    WarningListItemComponent,
    WarningGroupFavouriteToggleComponent,
    AbonnerBannerComponent,
  ],
})
export class WarningListPageModule {}
