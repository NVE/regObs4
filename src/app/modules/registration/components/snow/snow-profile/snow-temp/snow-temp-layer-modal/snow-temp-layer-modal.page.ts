import { Component, OnInit, Input } from '@angular/core';
import { SnowTempObsModel } from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IsEmptyHelper } from '../../../../../../../core/helpers/is-empty.helper';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-snow-temp-layer-modal',
  templateUrl: './snow-temp-layer-modal.page.html',
  styleUrls: ['./snow-temp-layer-modal.page.scss']
})
export class SnowTempLayerModalPage implements OnInit {
  @Input() layer: SnowTempObsModel;
  @Input() index: number;
  @Input() draft: RegistrationDraft;
  addNew: boolean;

  private initialRegistrationState: RegistrationDraft;

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService
  ) {}

  ngOnInit() {
    this.initialRegistrationState = cloneDeep(this.draft);
    this.initLayer();
  }

  private initLayer() {
    this.addNew = this.layer === undefined;
    if (this.addNew) {
      this.layer = {};
    }
  }

  get hasLayers() {
    return this.draft?.registration?.SnowProfile2?.SnowTemp?.Layers?.length > 0;
  }

  get layerLenght() {
    return this.hasLayers
      ? this.draft.registration.SnowProfile2.SnowTemp.Layers.length
      : 0;
  }

  get canGoNext() {
    return (
      (this.hasLayers && this.index < this.layerLenght) ||
      (this.index === this.layerLenght &&
        this.addNew &&
        !IsEmptyHelper.isEmpty(this.layer))
    );
  }

  async ok(gotoIndex?: number) {
    if (!this.draft.registration.SnowProfile2) {
      this.draft.registration.SnowProfile2 = {};
    }
    if (!this.draft.registration.SnowProfile2.SnowTemp) {
      this.draft.registration.SnowProfile2.SnowTemp = {};
    }
    if (!this.draft.registration.SnowProfile2.SnowTemp.Layers) {
      this.draft.registration.SnowProfile2.SnowTemp.Layers = [];
    }
    if (this.addNew && !IsEmptyHelper.isEmpty(this.layer)) {
      this.draft.registration.SnowProfile2.SnowTemp.Layers.splice(
        this.index,
        0,
        this.layer
      );
    }
    await this.draftRepository.save(this.draft);

    if (gotoIndex !== undefined) {
      this.index = this.index + gotoIndex;
      this.layer = this.draft.registration.SnowProfile2.SnowTemp.Layers[this.index];
      this.initLayer();
    } else {
      this.modalController.dismiss();
    }
  }

  async cancel() {
    await this.draftRepository.save(this.initialRegistrationState);
    this.modalController.dismiss();
  }

  async delete() {
    if (this.hasLayers) {
      this.draft.registration.SnowProfile2.SnowTemp.Layers = this.draft.registration.SnowProfile2.SnowTemp.Layers.filter(
        (l) => l !== this.layer
      );
      await this.draftRepository.save(this.draft);
    }
    this.modalController.dismiss({ delete: true });
  }
}
