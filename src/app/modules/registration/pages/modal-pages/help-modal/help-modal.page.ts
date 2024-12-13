import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { MarkdownComponent } from 'ngx-markdown';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.page.html',
  styleUrls: ['./help-modal.page.scss'],
  imports: [IonicModule, HeaderColorDirective, MarkdownComponent, TranslateModule],
})
export class HelpModalPage {
  @Input() helpText: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
