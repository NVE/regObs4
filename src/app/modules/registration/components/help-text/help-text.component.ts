import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { HelpTextService } from '../../services/help-text/help-text.service';
import { HelptextDto } from '../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { HelpModalPage } from '../../pages/modal-pages/help-modal/help-modal.page';

@Component({
  selector: 'app-help-text',
  templateUrl: './help-text.component.html',
  styleUrls: ['./help-text.component.scss']
})
export class HelpTextComponent implements OnInit {
  @Input() registrationTid: number;
  @Input() geoHazard: GeoHazard;

  isVisible = false;
  helpText: HelptextDto;

  constructor(
    private helpTextService: HelpTextService,
    private userSettingService: UserSettingService,
    private modalController: ModalController,
    private ngZone: NgZone) { }

  async ngOnInit() {
    const userSetting = this.userSettingService.currentSettings;
    this.helpText = await this.helpTextService.getHelpTextByKey(
      userSetting.language,
      userSetting.appMode,
      this.geoHazard,
      this.registrationTid);
    if (this.helpText) {
      this.ngZone.run(() => {
        this.isVisible = true;
      });
    }
  }

  async showHelp() {
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        helpText: this.helpText.Text,
      },
    });
    modal.present();
  }
}
