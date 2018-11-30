import { NgModule } from '@angular/core';
import { LegalTermsModalPage } from './legal-terms-modal.page';
import { SharedModule } from '../../../modules/shared/shared.module';


@NgModule({
  imports: [SharedModule],
  declarations: [LegalTermsModalPage],
  entryComponents: [LegalTermsModalPage],
  exports: [LegalTermsModalPage],
})
export class LegalTermsModalPageModule { }
