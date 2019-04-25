import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strat-profile-layer-modal',
  templateUrl: './strat-profile-layer-modal.page.html',
  styleUrls: ['./strat-profile-layer-modal.page.scss'],
})
export class StratProfileLayerModalPage implements OnInit {

  @Input() layer: StratProfileLayerDto;

  showDelete = false;
  layerCopy: StratProfileLayerDto;

  grainSizeTypes: { id: number, text: string }[] = [
    { id: undefined, text: '' },
    { id: 1, text: '.1' },
    { id: 2, text: '.3' },
    { id: 3, text: '.5' },
    { id: 4, text: '1' },
    { id: 5, text: '1.5' },
    { id: 6, text: '2' },
    { id: 7, text: '2.5' },
    { id: 8, text: '3' },
    { id: 9, text: '3.5' },
    { id: 10, text: '4' },
    { id: 11, text: '4.5' },
    { id: 12, text: '5' },
    { id: 13, text: '5.5' },
    { id: 14, text: '6' },
    { id: 15, text: '8' },
    { id: 16, text: '10' },
  ];

  grainSizeInterfaceOptions: any;

  constructor(private modalController: ModalController, private translateService: TranslateService) { }

  ngOnInit() {
    if (this.layer !== undefined) {
      this.showDelete = true;
      this.layerCopy = { ...this.layer };
      return;
    }
    this.layerCopy = {};
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe((val) => {
      this.grainSizeInterfaceOptions = {
        header: val,
      };
    });
  }

  ok() {
    this.modalController.dismiss(this.layerCopy);
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
