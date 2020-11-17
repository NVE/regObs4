import { NgModule } from '@angular/core';
import { LegalTermsModalPage } from './legal-terms-modal.page';
import { SharedModule } from '../../../modules/shared/shared.module';
import { LegalTermsComponent } from '../../../components/legal-terms/legal-terms.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LegalTermsModalPage, LegalTermsComponent],
  entryComponents: [LegalTermsModalPage],
  exports: [LegalTermsModalPage],
})
export class LegalTermsModalPageModule { }
