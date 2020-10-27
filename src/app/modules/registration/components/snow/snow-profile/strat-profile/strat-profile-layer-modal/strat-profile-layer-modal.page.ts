import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StratProfileLayerDto, KdvElement } from '../../../../../../regobs-api/models';
import { TranslateService } from '@ngx-translate/core';
import { SelectOption } from '../../../../../../shared/components/input/select/select-option.model';
import { IRegistration } from '../../../../../models/registration.model';
import { RegistrationService } from '../../../../../services/registration.service';
import { IsEmptyHelper } from '../../../../../../../core/helpers/is-empty.helper';
import cloneDeep from 'clone-deep';

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
  @Input() reg: IRegistration;
  @Input() index: number;

  addNew: boolean;
  private initialRegistationState: IRegistration;

  grainSizeInterfaceOptions: any;
  showMore = false;
  hardnessFilter: (id: number) => boolean;
  grainFormFilter: (id: number) => boolean;
  wetnessFilter: (id: number) => boolean;

  get hasLayers() {
    return this.reg && this.reg.request && this.reg.request.SnowProfile2
      && this.reg.request.SnowProfile2.StratProfile
      && this.reg.request.SnowProfile2.StratProfile.Layers
      && this.reg.request.SnowProfile2.StratProfile.Layers.length > 0;
  }

  get layerLenght() {
    return this.hasLayers ? this.reg.request.SnowProfile2.StratProfile.Layers.length : 0;
  }

  get canGoNext() {
    return (this.hasLayers && this.index < this.layerLenght)
      || (this.index === this.layerLenght &&
        this.addNew && !IsEmptyHelper.isEmpty(this.layer));
  }

  grainSizeOptions: SelectOption[] = [
    { id: .001, text: '.1' },
    { id: .003, text: '.3' },
    { id: .005, text: '.5' },
    { id: .007, text: '.7' },
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

  constructor(private modalController: ModalController, private translateService: TranslateService, private registrationService:
    RegistrationService) { }

  ngOnInit() {
    this.initialRegistationState = cloneDeep(this.reg);
    this.initLayer();
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe((val) => {
      this.grainSizeInterfaceOptions = {
        header: val,
      };
    });
  }

  private initLayer() {
    this.addNew = this.layer === undefined;
    if (this.addNew) {
      this.layer = {};
    }
    this.showMore = this.hasAnyAdvancedOptions();
    this.updateFilters();
  }

  private hasAnyAdvancedOptions() {
    return this.layer.HardnessBottomTID > 0
      || this.layer.GrainSizeAvgMax > 0
      || this.layer.GrainFormSecondaryTID > 0
      || this.layer.CriticalLayerTID > 0
      || !!this.layer.Comment;
  }

  async save() {
    await this.registrationService.saveRegistrationAsync(this.reg);
  }

  async ok(gotoIndex?: number) {
    if (!this.reg.request.SnowProfile2) {
      this.reg.request.SnowProfile2 = {};
    }
    if (!this.reg.request.SnowProfile2.StratProfile) {
      this.reg.request.SnowProfile2.StratProfile = {};
    }
    if (!this.reg.request.SnowProfile2.StratProfile.Layers) {
      this.reg.request.SnowProfile2.StratProfile.Layers = [];
    }
    if (this.addNew && !IsEmptyHelper.isEmpty(this.layer)) {
      this.reg.request.SnowProfile2.StratProfile.Layers.splice(this.index, 0, this.layer);
    }
    await this.save();

    if (gotoIndex !== undefined) {
      this.index = this.index + (gotoIndex);
      this.layer = this.reg.request.SnowProfile2.StratProfile.Layers[this.index];
      this.initLayer();
    } else {
      this.modalController.dismiss();
    }
  }

  async cancel() {
    await this.registrationService.saveRegistrationAsync(this.initialRegistationState);
    this.modalController.dismiss();
  }

  async delete() {
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile
      && this.reg.request.SnowProfile2.StratProfile.Layers && this.reg.request.SnowProfile2.StratProfile.Layers.length > 0) {
      this.reg.request.SnowProfile2.StratProfile.Layers =
        this.reg.request.SnowProfile2.StratProfile.Layers.filter((l) => l !== this.layer);
      await this.save();
    }
    this.modalController.dismiss();
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
