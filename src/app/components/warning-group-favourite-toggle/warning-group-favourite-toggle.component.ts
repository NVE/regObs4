import { Component, OnInit, Input, NgZone, OnDestroy, Renderer2, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { WarningService } from '../../core/services/warning/warning.service';
import { Subscription } from 'rxjs';
import { WarningGroupKey } from '../../core/services/warning/warning-group-key.interface';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, DomController, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-warning-group-favourite-toggle',
  templateUrl: './warning-group-favourite-toggle.component.html',
  styleUrls: ['./warning-group-favourite-toggle.component.scss']
})
export class WarningGroupFavouriteToggleComponent implements OnInit, OnDestroy, OnChanges {

  @Input() key: WarningGroupKey;
  @ViewChild(IonIcon) ionIcon: IonIcon;

  private warningIsFavouriteSubscription: Subscription;
  isFavourite: boolean;
  private _lastKey: WarningGroupKey;

  constructor(
    private warningService: WarningService,
    private translateService: TranslateService,
    private ngZone: NgZone,
    private domCtrl: DomController,
    private renderer: Renderer2,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentKey: WarningGroupKey = changes.key.currentValue;
    if (!this._lastKey || (this._lastKey.groupId !== currentKey.groupId)) {
      this._lastKey = currentKey;
      this.startSubscription(currentKey);
    }
  }

  startSubscription(key: WarningGroupKey) {
    this.warningIsFavouriteSubscription =
      this.warningService.getIsFavouriteObservable(key.groupId, key.geoHazard)
        .subscribe((val) => {
          this.ngZone.run(() => {
            this.isFavourite = val;
          });
        });
  }

  setOpen(openAmount: number) {
    const scaleAmount = 1 + (openAmount / 2.0);
    const scale = `scale3d(${scaleAmount},${scaleAmount},1)`;
    this.domCtrl.write(() => {
      this.renderer.setStyle((<any>this.ionIcon).el, 'transform', scale);
    });
  }

  ngOnDestroy(): void {
    if (this.warningIsFavouriteSubscription) {
      this.warningIsFavouriteSubscription.unsubscribe();
    }
  }

  toggle() {
    if (this.isFavourite) {
      this.warningService.removeFromFavourite(this.key.groupId, this.key.geoHazard)
        .then(() => this.presentToast(false));
    } else {
      this.warningService.addToFavourite(this.key.groupId, this.key.geoHazard)
        .then(() => this.presentToast(true));
    }
  }

  async presentToast(added: boolean) {
    this.translateService.
      get(['WARNING_LIST.ADDED_TO_FAVOURITES', 'WARNING_LIST.REMOVED_FROM_FAVOURITES', 'ALERT.UNDO'])
      .subscribe(async (translation) => {
        const toast = await this.toastController.create({
          message: `${this.key.groupName} ${added ? translation['WARNING_LIST.ADDED_TO_FAVOURITES'] :
            translation['WARNING_LIST.REMOVED_FROM_FAVOURITES']}`,
          mode: 'md',
          showCloseButton: true,
          closeButtonText: translation['ALERT.UNDO'],
          duration: 4000
        });
        toast.present();
        const result = await toast.onDidDismiss();
        if (result.role === 'cancel') {
          if (added) {
            this.warningService.removeFromFavourite(this.key.groupId, this.key.geoHazard);
          } else {
            this.warningService.addToFavourite(this.key.groupId, this.key.geoHazard);
          }
        }
      });
  }
}
