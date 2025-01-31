import { Component, OnInit, Signal, computed, inject, input, linkedSignal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { StratProfileLayerEditModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { SelectOption } from '../../../../../../shared/components/input/select/select-option.model';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NumericInputComponent } from '../../../../numeric-input/numeric-input.component';
import { KdvSelectComponent } from '../../../../../../../components/kdv-select/kdv-select.component';
import { SelectComponent } from '../../../../../../shared/components/input/select/select.component';
import { NgIf, LowerCasePipe } from '@angular/common';
import { TextCommentComponent } from '../../../../text-comment/text-comment.component';
import { addIcons } from 'ionicons';
import { chevronUp, chevronDown, arrowBack, arrowForward, trash } from 'ionicons/icons';
import { hasAnyAdvancedOptions } from '../strat-profile-helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import cloneDeep from 'clone-deep';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

const basicHardnessValues = [2, 6, 10, 14, 18, 21];
const basicGrainFormValues = [1, 14, 17, 22, 26, 32, 36, 40, 41];
const basicWetnessValues = [1, 3, 5, 7, 9];
type FilterFunc = (id: number) => boolean;

@Component({
  selector: 'app-strat-profile-layer-modal',
  templateUrl: './strat-profile-layer-modal.page.html',
  styleUrls: ['./strat-profile-layer-modal.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    LowerCasePipe,
    NgIf,
    NumericInputComponent,
    SelectComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class StratProfileLayerModalPage implements OnInit {
  private modalController = inject(ModalController);
  private translateService = inject(TranslateService);
  private draftRepository = inject(DraftRepositoryService);

  readonly draft = input.required<RegistrationDraft>();
  readonly index = input.required<number>();
  private readonly initialRegistationState = cloneDeep(this.draft());

  currentIndex = linkedSignal(() => this.index());
  layers = linkedSignal(() => this.draft().registration.SnowProfile2?.StratProfile?.Layers || []);
  layer = computed(() => this.layers()[this.currentIndex()]);
  isNewLayer = computed(() => this.layer() == null);

  // Form values
  thickness = linkedSignal(() => this.layer()?.Thickness);
  isThicknessValid = computed(() => isThicknessValid(this.thickness()));
  hardnessTid = linkedSignal(() => this.layer()?.HardnessTID);
  hardnessBottomTid = linkedSignal(() => this.layer()?.HardnessBottomTID);
  grainFormPrimaryTid = linkedSignal(() => this.layer()?.GrainFormPrimaryTID);
  grainFormSecondaryTid = linkedSignal(() => this.layer()?.GrainFormSecondaryTID);
  grainSizeAvg = linkedSignal(() => this.layer()?.GrainSizeAvg);
  grainSizeAvgMax = linkedSignal(() => this.layer()?.GrainSizeAvgMax);
  wetnessTid = linkedSignal(() => this.layer()?.WetnessTID);
  criticalLayerTid = linkedSignal(() => this.layer()?.CriticalLayerTID);
  comment = linkedSignal(() => this.layer()?.Comment);

  isLayerValid = computed(() => this.isThicknessValid());
  hasAnyAdvancedOptions = computed(() => hasAnyAdvancedOptions(this.layer()));
  showMore = linkedSignal(() => this.hasAnyAdvancedOptions());

  nLayers = computed(() => this.layers().length);
  canGoNext = computed(() => this.currentIndex() < this.nLayers());
  canGoBack = computed(() => this.currentIndex() > 0);

  hardnessFilter: Signal<FilterFunc | undefined> = computed(() =>
    this.showMore() ? undefined : (n) => basicHardnessValues.indexOf(n) >= 0
  );

  grainFormFilter: Signal<FilterFunc | undefined> = computed(() =>
    this.showMore() ? undefined : (n) => basicGrainFormValues.indexOf(n) >= 0
  );

  wetnessFilter: Signal<FilterFunc | undefined> = computed(() =>
    this.showMore() ? undefined : (n) => basicWetnessValues.indexOf(n) >= 0
  );

  grainSizeInterfaceOptions: any;
  grainSizeOptions: SelectOption[] = [
    { id: 0.001, text: '.1' },
    { id: 0.003, text: '.3' },
    { id: 0.005, text: '.5' },
    { id: 0.007, text: '.7' },
    { id: 0.01, text: '1' },
    { id: 0.015, text: '1.5' },
    { id: 0.02, text: '2' },
    { id: 0.025, text: '2.5' },
    { id: 0.03, text: '3' },
    { id: 0.035, text: '3.5' },
    { id: 0.04, text: '4' },
    { id: 0.045, text: '4.5' },
    { id: 0.05, text: '5' },
    { id: 0.055, text: '5.5' },
    { id: 0.06, text: '6' },
    { id: 0.08, text: '8' },
    { id: 0.1, text: '10' },
  ];

  getIconFunc = (kdvElement: KdvElement) => `md-grainform-${((kdvElement || {}).Name || '').toLowerCase()}`;

  constructor() {
    addIcons({ chevronUp, chevronDown, arrowBack, arrowForward, trash });
  }

  ngOnInit() {
    this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe((val) => {
      this.grainSizeInterfaceOptions = {
        header: val,
      };
    });
  }

  addOrUpdateLayer() {
    const layer: StratProfileLayerEditModel = {
      Comment: this.comment(),
      CriticalLayerTID: this.criticalLayerTid(),
      // DepthTop: this.depthTop(),
      GrainFormPrimaryTID: this.grainFormPrimaryTid(),
      GrainFormSecondaryTID: this.grainFormSecondaryTid(),
      GrainSizeAvg: this.grainSizeAvg(),
      GrainSizeAvgMax: this.grainSizeAvgMax(),
      HardnessBottomTID: this.hardnessBottomTid(),
      HardnessTID: this.hardnessTid(),
      // SortOrder?: number;
      Thickness: this.thickness(),
      WetnessTID: this.wetnessTid(),
    };

    if (this.isNewLayer()) {
      this.layers.update((layers) => [...layers, layer]);
    } else {
      const index = this.currentIndex();
      this.layers.update((layers) => layers.map((l, i) => (i === index ? layer : l)));
    }
  }

  async save() {
    const initDraft = this.draft();
    const draftUpdate: RegistrationDraft = {
      ...initDraft,
      registration: {
        ...initDraft.registration,
        SnowProfile2: {
          ...(initDraft.registration.SnowProfile2 || {}),
          StratProfile: {
            Layers: this.layers(),
          },
        },
      },
    };

    await this.draftRepository.save(draftUpdate);
  }

  async ok(gotoIndex?: number) {
    if (!this.isLayerValid()) {
      return;
    }

    this.addOrUpdateLayer();
    await this.save();

    if (gotoIndex != null) {
      this.currentIndex.update((i) => i + gotoIndex);
    } else {
      this.modalController.dismiss();
    }
  }

  async cancel() {
    await this.draftRepository.save(this.initialRegistationState);
    this.modalController.dismiss();
  }

  async delete() {
    const index = this.currentIndex();
    this.layers.update((layers) => layers.filter((l, i) => i !== index));
    await this.save();
    this.modalController.dismiss();
  }

  toggleShowMore() {
    this.showMore.update((showMore) => !showMore);
  }
}

function isThicknessValid(value?: number) {
  if (value == null) {
    return false;
  }

  return value > 0;
}
