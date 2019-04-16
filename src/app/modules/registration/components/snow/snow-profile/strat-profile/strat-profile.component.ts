import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StratProfileDto } from '../../../../../regobs-api/models/strat-profile-dto';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { StratProfileModalPage } from './strat-profile-modal/strat-profile-modal.page';

@Component({
  selector: 'app-strat-profile',
  templateUrl: './strat-profile.component.html',
  styleUrls: ['./strat-profile.component.scss']
})
export class StratProfileComponent implements OnInit {

  @Input() profile: StratProfileDto;
  @Output() profileChange = new EventEmitter();

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.profile);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalContoller.create({
      component: StratProfileModalPage,
      componentProps: {
        profile: { ...this.profile },
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      this.profile = result.data;
      this.profileChange.emit(this.profile);
    }
  }
}
