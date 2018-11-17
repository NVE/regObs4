import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FullscreenImageModalPage } from './fullscreen-image-modal.page';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, PinchZoomModule],
  declarations: [FullscreenImageModalPage],
  entryComponents: [FullscreenImageModalPage]
})
export class FullscreenImageModalPageModule { }
