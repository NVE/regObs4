import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../modules/shared/directives/header-color/header-color.directive';
import { LegalTermsComponent } from '../../../components/legal-terms/legal-terms.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-terms-modal',
  templateUrl: './legal-terms-modal.page.html',
  styleUrls: ['./legal-terms-modal.page.scss'],
  imports: [IonicModule, HeaderColorDirective, LegalTermsComponent, TranslateModule],
})
export class LegalTermsModalPage {
  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
