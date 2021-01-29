import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-save-or-delete-buttons',
  templateUrl: './modal-save-or-delete-buttons.component.html',
  styleUrls: ['./modal-save-or-delete-buttons.component.scss']
})
export class ModalSaveOrDeleteButtonsComponent implements OnInit {
  @Input() saveText = 'DIALOGS.OK';
  @Input() saveDisabled = false;
  @Output() saveClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Input() showDelete = false;
  @Input() alertTitle = 'DIALOGS.ARE_YOU_SURE';
  @Input() alertMessage = '';

  constructor(
    private translateService: TranslateService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ok() {
    this.saveClicked.emit();
  }

  async delete() {
    const toTranslate = [this.alertTitle, 'DIALOGS.CANCEL', 'DIALOGS.OK'];
    if (this.alertMessage) {
      toTranslate.push(this.alertMessage);
    }
    const translations = await this.translateService
      .get(toTranslate)
      .toPromise();
    const alert = await this.alertController.create({
      header: translations[this.alertTitle],
      message: this.alertMessage ? translations[this.alertMessage] : undefined,
      buttons: [
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel'
        },
        {
          text: translations['DIALOGS.OK'],
          handler: () => {
            this.deleteClicked.emit();
          }
        }
      ]
    });
    alert.present();
  }
}
