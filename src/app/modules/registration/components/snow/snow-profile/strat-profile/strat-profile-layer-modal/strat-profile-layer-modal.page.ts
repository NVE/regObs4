import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto, KdvElement } from '../../../../../../regobs-api/models';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '../../../../../../shared/components/input/select/select-option.model';

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

  grainSizeInterfaceOptions: any;
  showDelete = false;
  showMore = false;
  hardnessFilter: (id: number) => boolean;
  grainFormFilter: (id: number) => boolean;
  wetnessFilter: (id: number) => boolean;

  grainSizeOptions: SelectOption[] = [
    { id: .001, text: '.1' },
    { id: .003, text: '.3' },
    { id: .005, text: '.5' },
    { id: .01, text: '1' },
    { id: .015, text: '1.5' },
    { id: .02, text: '2' },
    { id: .025, text: '2.5' },
    { id: .03, text: '3' },
    { id: .035, text: '3.5' },
    { id: .04, text: '4' },
    { id: .045, text: '4.5' },
    { id: .05, text: '5' },
    { id: .055, text: '5.5' },
    { id: .06, text: '6' },
    { id: .08, text: '8' },
    { id: .10, text: '10' },
  ];

  getIconFunc = (kdvElement: KdvElement) => `md-grainform-${((kdvElement || {}).Name || '').toLowerCase()}`;

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
      || !!this.layer.Comment;
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
