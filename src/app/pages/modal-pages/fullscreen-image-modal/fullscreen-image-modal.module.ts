import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FullscreenImageModalPage } from './fullscreen-image-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  declarations: [FullscreenImageModalPage],
})
export class FullscreenImageModalPageModule {}
