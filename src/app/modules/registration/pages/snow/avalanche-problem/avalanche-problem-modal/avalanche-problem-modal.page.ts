import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AvalancheEvalProblem2Dto, KdvElement } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { KdvService } from '../../../../../../core/services/kdv/kdv.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-avalanche-problem-modal',
  templateUrl: './avalanche-problem-modal.page.html',
  styleUrls: ['./avalanche-problem-modal.page.scss'],
})
export class AvalancheProblemModalPage implements OnInit, OnDestroy {


  @Input() avalancheEvalProblem: AvalancheEvalProblem2Dto;
  avalancheEvalProblemCopy: AvalancheEvalProblem2Dto;
  isNew = false;

  get noWeakLayers() {
    return this.avalancheEvalProblemCopy.AvalCauseTID === 24;
  }

  set noWeakLayers(val: boolean) {
    this.avalancheEvalProblemCopy.AvalCauseTID = val ? 24 : undefined;
    this.avalCauseChanged(this.avalancheEvalProblemCopy.AvalCauseTID);
  }

  avalancheProblemView: { AvalancheExtTID: number, AvalCauseTID: number }[];
  avalancheCauseAttributes: { kdvElement: KdvElement, selected: boolean }[];
  avalancheExtKdv: KdvElement[];
  avalancheExtKdvFiltered: KdvElement[];
  exposition: number[];

  private viewSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private kdvService: KdvService
  ) { }

  ngOnInit() {
    if (this.avalancheEvalProblem) {
      this.avalancheEvalProblemCopy = { ...this.avalancheEvalProblem };
    } else {
      this.avalancheEvalProblemCopy = {};
      this.isNew = true;
    }

    this.viewSubscription = combineLatest(
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseAttributeFlags'),
      this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V'),
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheExtKDV'),
    ).subscribe(([snowCauseAttributesKdvElements, avalancheProblemView, avalancheExtKdv]) => {
      this.avalancheProblemView = avalancheProblemView;
      this.avalancheExtKdv = avalancheExtKdv;
      this.avalancheCauseAttributes =
        this.getAvalancheCauseAttributes(this.avalancheEvalProblemCopy.AvalCauseAttributes, snowCauseAttributesKdvElements);
      this.avalCauseChanged(this.avalancheEvalProblemCopy.AvalCauseTID);
    });
  }

  ngOnDestroy(): void {
    if (this.viewSubscription) {
      this.viewSubscription.unsubscribe();
    }
  }

  avalCauseChanged(val: number) {
    this.avalancheEvalProblemCopy.AvalCauseTID = val;
    setTimeout(() => {
      this.avalancheExtKdvFiltered = null;
      setTimeout(() => {
        this.avalancheExtKdvFiltered = this.getAvalancheExtFiltered();
      });
    });
    // Note! There is a bug where action sheet is not updaing, so have to recreate it with ngIf
    // TODO: Test if this still is the case...
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

  ok() {
    if (this.noWeakLayers) {
      this.resetAvalancheCauseFields();
    } else {
      const causeAttribute = this.getAvalacheCauseAttributeValue(this.avalancheCauseAttributes);
      this.avalancheEvalProblemCopy.AvalCauseAttributes = causeAttribute > 0 ? causeAttribute : undefined;
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
}
