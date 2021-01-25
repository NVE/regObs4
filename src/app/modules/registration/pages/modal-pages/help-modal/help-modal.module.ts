import { NgModule } from '@angular/core';
import { HelpModalPage } from './help-modal.page';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [SharedModule, MarkdownModule.forChild()],
  declarations: [HelpModalPage],
  entryComponents: [HelpModalPage]
})
export class HelpModalPageModule {}
