import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StratProfileDto } from '../../../../../regobs-api/models/strat-profile-dto';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { StratProfileModalPage } from './strat-profile-modal/strat-profile-modal.page';
import { ObsLocationDto } from '../../../../../regobs-api/models';

@Component({
  selector: 'app-strat-profile',
  templateUrl: './strat-profile.component.html',
  styleUrls: ['./strat-profile.component.scss']
})
export class StratProfileComponent implements OnInit {

  @Input() profile: StratProfileDto;
  @Output() profileChange = new EventEmitter();
  @Input() obsLocation: ObsLocationDto;

  private isOpen = false;


  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profile);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalContoller.create({
        component: StratProfileModalPage,
        componentProps: {
          profile: { ...this.profile },
          obsLocation: this.obsLocation,
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        this.profile = result.data;
        this.profileChange.emit(this.profile);
      }
    }
  }
}
