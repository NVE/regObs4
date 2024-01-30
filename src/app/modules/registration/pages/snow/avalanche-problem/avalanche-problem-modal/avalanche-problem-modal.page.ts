import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AvalancheEvalProblem2EditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { Subscription, combineLatest } from 'rxjs';
import { KdvService } from 'src/app/modules/common-registration/registration.services';

const NO_WEAK_LAYER_KDV_VALUE = 24;

interface AvalancheProblemKeys {
  AvalancheExtTID: number;
  AvalCauseTID: number;
}

/**
 * Modal for å legge til ett enkelt skredproblem.
 *
 * NB: Noen av valgene i skjemaet styres dynamisk av tabellen AvalCauseAttributeFlags.
 * De valgene som har "IsActive" satt til 1 vil vises i skjemaet.
 */
@Component({
  selector: 'app-avalanche-problem-modal',
  templateUrl: './avalanche-problem-modal.page.html',
  styleUrls: ['./avalanche-problem-modal.page.scss'],
})
export class AvalancheProblemModalPage implements OnInit, OnDestroy {
  @Input() avalancheEvalProblem: AvalancheEvalProblem2EditModel;
  avalancheEvalProblemCopy: AvalancheEvalProblem2EditModel;
  isNew = false;
  avalancheExtKdvFilter: (id: number) => boolean;

  setAvalCauseTID(value: AvalancheEvalProblem2EditModel['AvalCauseTID']) {
    this.avalancheEvalProblemCopy.AvalCauseTID = value;
    // Filteret på AvalancheExt (skredtype) verdier baserer seg på hvilken AvalCause (skredproblem) som er valgt.
    // Oppdater derfor filteret når AvalCause endrer seg.
    this.updateAvalancheExtKdvFilter();
  }

  get noWeakLayers() {
    return this.avalancheEvalProblemCopy.AvalCauseTID === NO_WEAK_LAYER_KDV_VALUE;
  }

  set noWeakLayers(val: boolean) {
    this.setAvalCauseTID(val ? NO_WEAK_LAYER_KDV_VALUE : undefined);
  }

  avalancheProblemView: AvalancheProblemKeys[];
  avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[];
  exposition: number[];

  private viewSubscription: Subscription;

  constructor(private modalController: ModalController, private kdvService: KdvService) {}

  ngOnInit() {
    if (this.avalancheEvalProblem) {
      this.avalancheEvalProblemCopy = { ...this.avalancheEvalProblem };
    } else {
      this.avalancheEvalProblemCopy = {};
      this.isNew = true;
    }

    this.viewSubscription = combineLatest([
      this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseAttributeFlags'),
      this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V'),
    ]).subscribe(([snowCauseAttributesKdvElements, avalancheProblemView]) => {
      this.avalancheProblemView = avalancheProblemView as AvalancheProblemKeys[];
      this.avalancheCauseAttributes = this.getAvalancheCauseAttributes(snowCauseAttributesKdvElements);
      this.updateAvalancheExtKdvFilter();
    });
  }

  ngOnDestroy(): void {
    if (this.viewSubscription) {
      this.viewSubscription.unsubscribe();
    }
  }

  private updateAvalancheExtKdvFilter() {
    const avalCauseTid = this.avalancheEvalProblemCopy.AvalCauseTID || 0;
    const extTids = this.avalancheProblemView
      .filter((v) => v.AvalCauseTID === avalCauseTid)
      .map((v) => v.AvalancheExtTID);

    this.avalancheExtKdvFilter = (tid: AvalancheEvalProblem2EditModel['AvalancheExtTID']) => extTids.indexOf(tid) >= 0;

    // Sjekk om filteret fortsatt sier at den AvalancheExt vi har valgt er gyldig.
    // Hvis den ikke er gyldig, nullstill AvalancheExt-verdien.
    if (!this.avalancheExtKdvFilter(this.avalancheEvalProblemCopy.AvalancheExtTID)) {
      this.avalancheEvalProblemCopy.AvalancheExtTID = null;
    }
  }

  getAvalancheCauseAttributes(kdvElements: KdvElement[]): {
    kdvElement: KdvElement;
    selected: boolean;
  }[] {
    return kdvElements.map((val) => ({
      kdvElement: val,
      selected: this.isAvalancheCauseSelected(val),
    }));
  }

  isAvalancheCauseSelected(kdvElement: KdvElement): boolean {
    switch (kdvElement.Id) {
      case 1:
        return this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID === kdvElement.Id;
      case 2:
        // NB: Valg "Laget der bruddet skjer er tynt < 3 cm" ble fjernet i januar 2024.
        // Case 2 kan derfor fjernes når det har gått litt tid og vi er sånn passe sikre på at de
        // fleste bruker oppdaterte språkfiler uten dette valget.
        // Feks etter mai 2024.
        // Se https://nveprojects.atlassian.net/browse/RO-2573.
        return this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID === kdvElement.Id;
      case 4:
        return this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID === kdvElement.Id;
      case 8:
        return this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID === kdvElement.Id;
    }
    return false;
  }

  cancel() {
    this.modalController.dismiss();
  }

  // getAvalacheCauseAttributeValue(
  //   avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[]
  // ) {
  //   return avalancheCauseAttributes.reduce(function (prevVal, curVal) {
  //     return prevVal + (curVal.selected ? curVal.kdvElement.Id : 0);
  //   }, 0);
  // }

  resetAvalancheCauseFields() {
    this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = undefined;
    // NB: Valg "Laget der bruddet skjer er tynt < 3 cm" ble fjernet i januar 2024.
    // Linja nedenfor, som resetter AvalCauseAttributeThinTID kan derfor fjernes
    // når det har gått litt tid og vi er sånn passe sikre på at de fleste bruker
    // oppdaterte språkfiler uten dette valget. Feks etter mai 2024.
    // Se https://nveprojects.atlassian.net/browse/RO-2573.
    this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = undefined;
    this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = undefined;
    this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = undefined;
    this.avalancheEvalProblemCopy.AvalCauseDepthTID = undefined;
  }

  ok() {
    if (this.noWeakLayers) {
      this.resetAvalancheCauseFields();
    } else {
      // const causeAttribute = this.getAvalacheCauseAttributeValue(
      //   this.avalancheCauseAttributes
      // );
      // this.avalancheEvalProblemCopy.AvalCauseAttributes =
      //   causeAttribute > 0 ? causeAttribute : undefined;
      for (const val of this.avalancheCauseAttributes) {
        switch (val.kdvElement.Id) {
          case 1:
            this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = val.selected ? val.kdvElement.Id : undefined;
            break;
          case 2:
            // NB: Valg "Laget der bruddet skjer er tynt < 3 cm" ble fjernet i januar 2024.
            // Case 2 kan derfor fjernes når det har gått litt tid og vi er sånn passe sikre på at de
            // fleste bruker oppdaterte språkfiler uten dette valget.
            // Feks etter mai 2024.
            // Se https://nveprojects.atlassian.net/browse/RO-2573.
            this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = val.selected ? val.kdvElement.Id : undefined;
            break;
          case 4:
            this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = val.selected ? val.kdvElement.Id : undefined;
            break;
          case 8:
            this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = val.selected ? val.kdvElement.Id : undefined;
            break;
        }
      }
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
