import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ModalController } from '@ionic/angular';
import { HelpModalPage } from '../../pages/modal-pages/help-modal/help-modal.page';
import { HelpTextService } from 'src/app/modules/common-registration/registration.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-help-text',
  templateUrl: './help-text.component.html',
  styleUrls: ['./help-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent implements OnInit {
  @Input() registrationTid: number;
  @Input() geoHazard: GeoHazard;

  helpText$: Observable<string>;

  constructor(
    private helpTextService: HelpTextService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    this.helpText$ = this.helpTextService.getHelpTextObservable(this.geoHazard, this.registrationTid);
  }

  async showHelp(helpText: string) {
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        helpText: helpText
      }
    });
    modal.present();
  }
}
