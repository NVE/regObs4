import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoadComponent } from './components/data-load/data-load.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [DataLoadComponent],
  exports: [DataLoadComponent],
})
export class DataLoadModule { }
