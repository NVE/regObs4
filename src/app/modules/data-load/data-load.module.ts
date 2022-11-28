import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoadComponent } from './components/data-load/data-load.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [DataLoadComponent],
  exports: [DataLoadComponent],
})
export class DataLoadModule {}
