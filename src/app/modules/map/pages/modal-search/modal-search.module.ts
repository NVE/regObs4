import { NgModule } from '@angular/core';
import { ModalSearchPage } from './modal-search.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { StartsWithHighlightPipe } from '../../pipes/starts-with-highlight.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [ModalSearchPage, StartsWithHighlightPipe],
  entryComponents: [ModalSearchPage],
})
export class ModalSearchPageModule { }
