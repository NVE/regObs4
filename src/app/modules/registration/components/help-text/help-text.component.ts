import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { ModalController } from '@ionic/angular';
import { HelpModalPage } from '../../pages/modal-pages/help-modal/help-modal.page';
import { HelpTextService } from 'src/app/modules/common-registration/registration.services';
import { firstValueFrom, Observable } from 'rxjs';

/**
 * If help text exists for given registrationTid and heoHazard, show a "HELP"-button.
 * The button opens a modal containing actual help text.
 */
@Component({
  selector: 'app-help-text',
  templateUrl: './help-text.component.html',
  styleUrls: ['./help-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTextComponent implements OnInit {
  @Input() registrationTid: number;
  @Input() geoHazard: GeoHazard;

  hasHelpText$: Observable<boolean>;

  constructor(
    private helpTextService: HelpTextService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    this.hasHelpText$ = this.helpTextService.hasHelpTextObservable(this.geoHazard, this.registrationTid);
  }

  async showHelp() {
    const helpText = await firstValueFrom(this.helpTextService.getHelpTextObservable(this.geoHazard, this.registrationTid));
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        helpText: helpText
      }
    });
    modal.present();
  }
}
