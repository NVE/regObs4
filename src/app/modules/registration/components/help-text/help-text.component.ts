import { Component, OnInit, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { IonButton, IonCol, IonGrid, IonRow, ModalController } from '@ionic/angular/standalone';
import { HelpModalPage } from '../../pages/modal-pages/help-modal/help-modal.page';
import { HelpTextService } from 'src/app/modules/common-registration/registration.services';
import { firstValueFrom, Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * If help text exists for given registrationTid and heoHazard, show a "HELP"-button.
 * The button opens a modal containing actual help text.
 */
@Component({
  selector: 'app-help-text',
  templateUrl: './help-text.component.html',
  styleUrls: ['./help-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonButton, IonCol, IonGrid, IonRow, NgIf, TranslatePipe],
})
export class HelpTextComponent implements OnInit {
  private helpTextService = inject(HelpTextService);
  private modalController = inject(ModalController);

  readonly registrationTid = input.required<number>();
  readonly geoHazard = input.required<GeoHazard>();

  hasHelpText$?: Observable<boolean>;

  async ngOnInit() {
    this.hasHelpText$ = this.helpTextService.hasHelpTextObservable(this.geoHazard(), this.registrationTid());
  }

  async showHelp() {
    const helpText = await firstValueFrom(
      this.helpTextService.getHelpTextObservable(this.geoHazard(), this.registrationTid())
    );
    const modal = await this.modalController.create({
      component: HelpModalPage,
      componentProps: {
        helpText: helpText,
      },
    });
    modal.present();
  }
}
