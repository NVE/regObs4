import { NgModule } from '@angular/core';
import { SupportMapInfoPage } from './support-map-info.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule],
  declarations: [SupportMapInfoPage],
  entryComponents: [SupportMapInfoPage],
  exports: [SupportMapInfoPage]
})
export class SupportMapInfoPageModule { }
