import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TempObsDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { ModalController } from '@ionic/angular';
import { SnowTempModalPage } from './snow-temp-modal/snow-temp-modal.page';

@Component({
  selector: 'app-snow-temp',
  templateUrl: './snow-temp.component.html',
  styleUrls: ['./snow-temp.component.scss']
})
export class SnowTempComponent implements OnInit {

  @Input() tempProfile: TempObsDto;
  @Output() tempProfileChange = new EventEmitter();

  get isEmpty() {
    return IsEmptyHelper.isEmpty(this.tempProfile);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalContoller.create({
      component: SnowTempModalPage,
      componentProps: {
        tempProfile: { ...this.tempProfile },
      }
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      this.tempProfile = result.data;
      this.tempProfileChange.emit(this.tempProfile);
    }
  }
}
