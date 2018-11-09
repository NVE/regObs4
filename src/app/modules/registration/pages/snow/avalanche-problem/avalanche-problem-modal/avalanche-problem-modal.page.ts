import { Component, OnInit, Input } from '@angular/core';
import { AvalancheEvalProblem2Dto, KdvElement } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { KdvService } from '../../../../../../core/services/kdv/kdv.service';
import { UserSettingService } from '../../../../../../core/services/user-setting/user-setting.service';

const EMPTY_EXPOSITION = '00000000';
const ALL_EXPOSITION = '11111111';

@Component({
  selector: 'app-avalanche-problem-modal',
  templateUrl: './avalanche-problem-modal.page.html',
  styleUrls: ['./avalanche-problem-modal.page.scss'],
})
export class AvalancheProblemModalPage implements OnInit {

  @Input() avalancheEvalProblem: AvalancheEvalProblem2Dto;
  avalancheEvalProblemCopy: AvalancheEvalProblem2Dto;
  isNew = false;

  get noWeakLayers() {
    return this.avalancheEvalProblemCopy.AvalCauseTID === 24;
  }

  set noWeakLayers(val: boolean) {
    this.avalancheEvalProblemCopy.AvalCauseTID = val ? 24 : undefined;
  }

  avalancheProblemView: { AvalancheExtTID: number, AvalCauseTID: number }[];
  avalancheCauseAttributes: { kdvElement: KdvElement, selected: boolean }[];
  avalancheExtKdv: KdvElement[];
  avalancheExtKdvFiltered: KdvElement[];
  exposedHeightTop: boolean;
  exposedHeightMiddle: boolean;
  exposedHeightBottom: boolean;
  exposition: number[];
  heightArray = [
    2500, 2400, 2300, 2200, 2100,
    2000, 1900, 1800, 1700, 1600,
    1500, 1400, 1300, 1200, 1100,
    1000, 900, 800, 700, 600,
    500, 400, 300, 200, 100, 0
  ];

  constructor(
    private modalController: ModalController,
    private kdvService: KdvService,
    private userSettingService: UserSettingService,
  ) { }

  async ngOnInit() {
    const userSetting = await this.userSettingService.getUserSettings();
    const snowCauseAttributesKdvElements =
      await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, 'Snow_AvalCauseAttributeFlags');
    this.avalancheProblemView =
      await this.kdvService.getViewRepository(userSetting.language, userSetting.appMode, 'AvalancheProblemMenu3V');
    this.avalancheExtKdv = await this.kdvService.getKdvElements(userSetting.language, userSetting.appMode, 'Snow_AvalancheExtKDV');
    if (this.avalancheEvalProblem) {
      this.avalancheEvalProblemCopy = { ...this.avalancheEvalProblem };
    } else {
      this.avalancheEvalProblemCopy = {};
      this.isNew = true;
    }
    this.exposedHeightTop = this.avalancheEvalProblemCopy.ExposedHeightComboTID === 0
      || this.avalancheEvalProblemCopy.ExposedHeightComboTID === 3 || this.avalancheEvalProblemCopy.ExposedHeightComboTID === 1;
    this.exposedHeightMiddle = this.avalancheEvalProblemCopy.ExposedHeightComboTID === 0
      || this.avalancheEvalProblemCopy.ExposedHeightComboTID === 4;
    this.exposedHeightBottom = this.avalancheEvalProblemCopy.ExposedHeightComboTID === 0
      || this.avalancheEvalProblemCopy.ExposedHeightComboTID === 3 || this.avalancheEvalProblemCopy.ExposedHeightComboTID === 2;

    if (!this.avalancheEvalProblemCopy.ValidExposition) {
      this.avalancheEvalProblemCopy.ValidExposition = EMPTY_EXPOSITION;
    }

    this.avalancheCauseAttributes =
      this.getAvalancheCauseAttributes(this.avalancheEvalProblemCopy.AvalCauseAttributes, snowCauseAttributesKdvElements);
    this.avalCauseChanged();
  }

  setExposedHeights(exposedHeightComboTID: number) {
    if (exposedHeightComboTID === 0) {
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 1) { // Hvit nederst
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = false;
    } else if (exposedHeightComboTID === 2) { // Svart nederst
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 3) { // Hvit i midten
      this.exposedHeightTop = true;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = true;
    } else if (exposedHeightComboTID === 4) { // Svart i midten
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = true;
      this.exposedHeightBottom = false;
    } else {
      this.exposedHeightTop = false;
      this.exposedHeightMiddle = false;
      this.exposedHeightBottom = false;
    }
  }

  sholdUseExposedHight2() {
    return (this.exposedHeightTop && this.exposedHeightBottom && !this.exposedHeightMiddle)
      || (!this.exposedHeightTop && !this.exposedHeightBottom && this.exposedHeightMiddle);
  }

  avalCauseChanged() {
    setTimeout(() => {
      this.avalancheExtKdvFiltered = null;
      setTimeout(() => {
        this.avalancheExtKdvFiltered = this.getAvalancheExtFiltered();
      });
    });
    // Note! There is a bug where action sheet is not updaing, so have to recreate it with ngIf
  }

  getAvalancheExtFiltered() {
    const avalCauseTid = this.avalancheEvalProblemCopy.AvalCauseTID || 0;
    const views = this.avalancheProblemView.filter((v) => v.AvalCauseTID === avalCauseTid)
      .map((v) => v.AvalancheExtTID);
    const filtered = this.avalancheExtKdv.filter((avalancheExt) => views.indexOf(avalancheExt.Id) >= 0);
    return filtered;
  }

  getAvalancheCauseAttributes(avalancheCauseAttribute: number, kdvElements: KdvElement[]) {
    const avalancheCauseAttributes: { kdvElement: KdvElement, selected: boolean }[] = [];
    let attr = avalancheCauseAttribute || 0;
    for (let i = kdvElements.length; i--;) {
      let selected = false;
      if (kdvElements[i].Id <= attr) {
        selected = true;
        attr -= kdvElements[i].Id;
      }
      avalancheCauseAttributes.push({ kdvElement: kdvElements[i], selected });
    }
    return avalancheCauseAttributes;
  }

  cancel() {
    this.modalController.dismiss();
  }

  getAvalacheCauseAttributeValue(avalancheCauseAttributes: { kdvElement: KdvElement, selected: boolean }[]) {
    return avalancheCauseAttributes
      .reduce(function (prevVal, curVal) {
        return prevVal + (curVal.selected ? curVal.kdvElement.Id : 0);
      }, 0);
  }

  resetAvalancheCauseFields() {
    this.avalancheEvalProblemCopy.AvalCauseAttributes = undefined;
    this.avalancheEvalProblemCopy.AvalCauseDepthTID = undefined;
  }

  setExposition(index: number) {
    const existingValue = this.avalancheEvalProblemCopy.ValidExposition.substr(index, 1);
    const newValue = existingValue === '1' ? '0' : '1';
    this.avalancheEvalProblemCopy.ValidExposition =
      (this.avalancheEvalProblemCopy.ValidExposition.substr(0, index)
        + newValue + this.avalancheEvalProblemCopy.ValidExposition.substr(index + 1));
  }

  toggleAllExpositions() {
    this.avalancheEvalProblemCopy.ValidExposition =
      this.avalancheEvalProblemCopy.ValidExposition === ALL_EXPOSITION ? EMPTY_EXPOSITION : ALL_EXPOSITION;
  }

  ok() {
    if (this.noWeakLayers) {
      this.resetAvalancheCauseFields();
    } else {
      const causeAttribute = this.getAvalacheCauseAttributeValue(this.avalancheCauseAttributes);
      this.avalancheEvalProblemCopy.AvalCauseAttributes = causeAttribute > 0 ? causeAttribute : undefined;
    }
    this.setExposedHight(this.exposedHeightTop, this.exposedHeightMiddle, this.exposedHeightBottom);
    if (this.avalancheEvalProblemCopy.ValidExposition === EMPTY_EXPOSITION) {
      this.avalancheEvalProblemCopy.ValidExposition = undefined;
    }
    if (!this.sholdUseExposedHight2()) {
      this.avalancheEvalProblemCopy.ExposedHeight2 = undefined;
    }
    if (IsEmptyHelper.isEmpty(this.avalancheEvalProblemCopy)) {
      this.modalController.dismiss();
    } else {
      this.modalController.dismiss(this.avalancheEvalProblemCopy);
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  private setExposedHight(top: boolean, middle: boolean, bottom: boolean) {
    if (top && middle && bottom) {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = 0;
    } else if (!top && middle && !bottom) {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = 4;
    } else if (top && !middle && bottom) {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = 3;
    } else if (bottom) {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = 2;
    } else if (top) {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = 1;
    } else {
      this.avalancheEvalProblemCopy.ExposedHeightComboTID = undefined;
    }
  }

}
