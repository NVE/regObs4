import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  AvalancheEvalProblem2Dto,
  KdvElement
} from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { KdvService } from '../../../../../../core/services/kdv/kdv.service';
import { Subscription, combineLatest } from 'rxjs';

const NO_WEAK_LAYER_KDV_VALUE = 24;

@Component({
  selector: 'app-avalanche-problem-modal',
  templateUrl: './avalanche-problem-modal.page.html',
  styleUrls: ['./avalanche-problem-modal.page.scss']
})
export class AvalancheProblemModalPage implements OnInit, OnDestroy {
  @Input() avalancheEvalProblem: AvalancheEvalProblem2Dto;
  avalancheEvalProblemCopy: AvalancheEvalProblem2Dto;
  isNew = false;
  avalancheExtKdvFilter: Function;

  get noWeakLayers() {
    return (
      this.avalancheEvalProblemCopy.AvalCauseTID === NO_WEAK_LAYER_KDV_VALUE
    );
  }

  set noWeakLayers(val: boolean) {
    this.avalancheEvalProblemCopy.AvalCauseTID = val
      ? NO_WEAK_LAYER_KDV_VALUE
      : undefined;
  }

  avalancheProblemView: { AvalancheExtTID: number; AvalCauseTID: number }[];
  avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[];
  exposition: number[];

  private viewSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private kdvService: KdvService
  ) {}

  ngOnInit() {
    this.avalancheExtKdvFilter = this.internalAvalancheExtKdvFilter.bind(this);

    if (this.avalancheEvalProblem) {
      this.avalancheEvalProblemCopy = { ...this.avalancheEvalProblem };
    } else {
      this.avalancheEvalProblemCopy = {};
      this.isNew = true;
    }

    this.viewSubscription = combineLatest(
      this.kdvService.getKdvRepositoryByKeyObservable(
        'Snow_AvalCauseAttributeFlags'
      ),
      this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V')
    ).subscribe(([snowCauseAttributesKdvElements, avalancheProblemView]) => {
      this.avalancheProblemView = avalancheProblemView;
      this.avalancheCauseAttributes = this.getAvalancheCauseAttributes(
        this.avalancheEvalProblemCopy.AvalCauseAttributes,
        snowCauseAttributesKdvElements
      );
    });
  }

  ngOnDestroy(): void {
    if (this.viewSubscription) {
      this.viewSubscription.unsubscribe();
    }
  }

  internalAvalancheExtKdvFilter(id: number) {
    const avalCauseTid = this.avalancheEvalProblemCopy.AvalCauseTID || 0;
    const views = this.avalancheProblemView
      .filter((v) => v.AvalCauseTID === avalCauseTid)
      .map((v) => v.AvalancheExtTID);
    return views.indexOf(id) >= 0;
  }

  getAvalancheCauseAttributes(
    avalancheCauseAttribute: number,
    kdvElements: KdvElement[]
  ) {
    const avalancheCauseAttributes: {
      kdvElement: KdvElement;
      selected: boolean;
    }[] = [];
    let attr = avalancheCauseAttribute || 0;
    for (let i = kdvElements.length; i--; ) {
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

  getAvalacheCauseAttributeValue(
    avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[]
  ) {
    return avalancheCauseAttributes.reduce(function (prevVal, curVal) {
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
      const causeAttribute = this.getAvalacheCauseAttributeValue(
        this.avalancheCauseAttributes
      );
      this.avalancheEvalProblemCopy.AvalCauseAttributes =
        causeAttribute > 0 ? causeAttribute : undefined;
    }
    if (IsEmptyHelper.isEmpty(this.avalancheEvalProblemCopy)) {
      this.modalController.dismiss({ delete: true });
    } else {
      this.modalController.dismiss(this.avalancheEvalProblemCopy);
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }
}
