import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { TranslateService } from '@ngx-translate/core';

const basicHardnessValues = [2, 6, 10, 14, 18, 21];

@Component({
  selector: 'app-strat-profile-layer-modal',
  templateUrl: './strat-profile-layer-modal.page.html',
  styleUrls: ['./strat-profile-layer-modal.page.scss'],
})
export class StratProfileLayerModalPage implements OnInit {

  @Input() layer: StratProfileLayerDto;

  showDelete = false;
  layerCopy: StratProfileLayerDto;
  showMore = false;
  hardnessFilter: (id: number) => boolean;

  grainSizeTypes: { id: number, text: string }[] = [
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
    { id: undefined, text: '' },
  ];

  grainSizeInterfaceOptions: any;

  // get hardnessFilter() {
  //   return (id: number) => this.showMore ? undefined : [2, 6, 10, 14, 18, 21];
  // }

  constructor(private modalController: ModalController, private translateService: TranslateService) { }

  ngOnInit() {
    if (this.layer !== undefined) {
      this.showDelete = true;
      this.layerCopy = { ...this.layer };
    } else {
      this.layerCopy = {};
    }
    this.showMore = this.hasAnyAdvancedOptions();
    this.setHardnessFilter();
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe((val) => {
      this.grainSizeInterfaceOptions = {
        header: val,
      };
    });
  }

  private hasAnyAdvancedOptions() {
    return this.layerCopy.HardnessBottomTID > 0
      || this.layerCopy.GrainSizeAvgMax > 0
      || this.layerCopy.GrainFormSecondaryTID > 0
      || this.layerCopy.CriticalLayerTID > 0
      || this.layerCopy.Comment !== undefined;
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

  toggleShowMore() {
    this.showMore = !this.showMore;
    this.setHardnessFilter();
  }

  private setHardnessFilter() {
    this.hardnessFilter = this.showMore ?
      undefined : (n) => basicHardnessValues.indexOf(n) >= 0;
  }
}
