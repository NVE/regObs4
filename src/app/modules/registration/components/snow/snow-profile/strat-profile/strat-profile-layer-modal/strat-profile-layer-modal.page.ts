import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto } from '../../../../../../regobs-api/models';
import { TranslateService } from '@ngx-translate/core';

const basicHardnessValues = [2, 6, 10, 14, 18, 21];
const basicGrainFormValues = [1, 14, 17, 22, 26, 32, 36, 40, 41];
const basicWetnessValues = [1, 3, 5, 7, 9];

@Component({
  selector: 'app-strat-profile-layer-modal',
  templateUrl: './strat-profile-layer-modal.page.html',
  styleUrls: ['./strat-profile-layer-modal.page.scss'],
})
export class StratProfileLayerModalPage implements OnInit {

  @Input() layer: StratProfileLayerDto;
  @Input() index: number;

  showDelete = false;
  showMore = false;
  hardnessFilter: (id: number) => boolean;
  grainFormFilter: (id: number) => boolean;
  wetnessFilter: (id: number) => boolean;

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

  constructor(private modalController: ModalController, private translateService: TranslateService) { }

  ngOnInit() {
    if (this.layer !== undefined) {
      this.showDelete = true;
    } else {
      this.layer = {};
    }
    this.showMore = this.hasAnyAdvancedOptions();
    this.updateFilters();
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe((val) => {
      this.grainSizeInterfaceOptions = {
        header: val,
      };
    });
  }

  private hasAnyAdvancedOptions() {
    return this.layer.HardnessBottomTID > 0
      || this.layer.GrainSizeAvgMax > 0
      || this.layer.GrainFormSecondaryTID > 0
      || this.layer.CriticalLayerTID > 0
      || this.layer.Comment !== undefined;
  }

  ok(gotoIndex?: number) {
    this.modalController.dismiss({ layer: this.layer, gotoIndex });
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
    this.updateFilters();
  }

  private updateFilters() {
    this.setHardnessFilter();
    this.setGrainFormFilter();
    this.setWetnessFilter();
  }

  private setHardnessFilter() {
    this.hardnessFilter = this.showMore ?
      undefined : (n) => basicHardnessValues.indexOf(n) >= 0;
  }

  private setGrainFormFilter() {
    this.grainFormFilter = this.showMore ? undefined : (n) => basicGrainFormValues.indexOf(n) >= 0;
  }

  private setWetnessFilter() {
    this.wetnessFilter = this.showMore ? undefined : (n) => basicWetnessValues.indexOf(n) >= 0;
  }
}
