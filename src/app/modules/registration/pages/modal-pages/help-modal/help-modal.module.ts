import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpModalPage } from './help-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MarkdownModule.forChild(),
  ],
  declarations: [HelpModalPage],
  entryComponents: [HelpModalPage]
})
export class HelpModalPageModule { }
