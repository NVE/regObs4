import {
  Component,
  NgZone,
  OnDestroy,
  Renderer2,
  OnChanges,
  SimpleChanges,
  inject,
  viewChild,
  input,
} from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Subscription } from 'rxjs';
import { WarningGroupKey } from '../../core/services/warning/warning-group-key.interface';
import { TranslateService } from '@ngx-translate/core';
import { DomController, IonIcon, ToastController } from '@ionic/angular/standalone';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-warning-group-favourite-toggle',
  templateUrl: './warning-group-favourite-toggle.component.html',
  styleUrls: ['./warning-group-favourite-toggle.component.scss'],
  imports: [IonIcon, NgClass],
})
export class WarningGroupFavouriteToggleComponent implements OnDestroy, OnChanges {
  private warningService = inject(WarningService);
  private translateService = inject(TranslateService);
  private ngZone = inject(NgZone);
  private domCtrl = inject(DomController);
  private renderer = inject(Renderer2);
  private toastController = inject(ToastController);

  readonly key = input.required<WarningGroupKey>();
  readonly ionIcon = viewChild.required(IonIcon);

  private warningIsFavouriteSubscription?: Subscription;
  isFavourite?: boolean;
  private _lastKey?: WarningGroupKey;

  constructor() {
    addIcons({ star });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentKey: WarningGroupKey = changes['key'].currentValue;
    if (!this._lastKey || this._lastKey.groupId !== currentKey.groupId) {
      this._lastKey = currentKey;
      this.startSubscription(currentKey);
    }
  }

  startSubscription(key: WarningGroupKey) {
    this.warningIsFavouriteSubscription = this.warningService
      .getIsFavouriteObservable(key.groupId, key.geoHazard)
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.isFavourite = val;
        });
      });
  }

  setOpen(openAmount: number) {
    const scaleAmount = 1 + openAmount / 2.0;
    const scale = `scale3d(${scaleAmount},${scaleAmount},1)`;
    this.domCtrl.write(() => {
      this.renderer.setStyle((<any>this.ionIcon()).el, 'transform', scale);
    });
  }

  ngOnDestroy(): void {
    if (this.warningIsFavouriteSubscription) {
      this.warningIsFavouriteSubscription.unsubscribe();
    }
  }

  toggle() {
    const key = this.key();
    if (this.isFavourite) {
      this.warningService.removeFromFavourite(key.groupId, key.geoHazard).then(() => this.presentToast(false));
    } else {
      this.warningService.addToFavourite(key.groupId, key.geoHazard).then(() => this.presentToast(true));
    }
  }

  presentToast(added: boolean) {
    this.translateService
      .get(['WARNING_LIST.ADDED_TO_FAVOURITES', 'WARNING_LIST.REMOVED_FROM_FAVOURITES', 'ALERT.UNDO'])
      .subscribe(async (translation) => {
        const key = this.key();
        const toast = await this.toastController.create({
          message: `${key.groupName} ${
            added
              ? translation['WARNING_LIST.ADDED_TO_FAVOURITES']
              : translation['WARNING_LIST.REMOVED_FROM_FAVOURITES']
          }`,
          mode: 'md',
          duration: 4000,
          buttons: [
            {
              text: translation['ALERT.UNDO'],
              role: 'cancel',
              handler: () => {
                if (added) {
                  this.warningService.removeFromFavourite(key.groupId, key.geoHazard);
                } else {
                  this.warningService.addToFavourite(key.groupId, key.geoHazard);
                }
              },
            },
          ],
        });
        toast.present();
      });
  }
}
