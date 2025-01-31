import {
  Component,
  OnInit,
  NgZone,
  inject,
  input,
  linkedSignal,
  computed,
  ResourceRef,
  Signal,
  untracked,
} from '@angular/core';
import { DangerObsEditModel } from 'src/app/modules/common-regobs-api/models';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { TranslateService, TranslatePipe, TranslationObject } from '@ngx-translate/core';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { HeaderColorDirective } from '../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KdvSelectComponent } from '../../../../../components/kdv-select/kdv-select.component';
import { SelectComponent } from '../../../../shared/components/input/select/select.component';
import { TextCommentComponent } from '../../../components/text-comment/text-comment.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { KdvKey } from 'src/app/modules/common-registration/registration.models';
import { rxResource } from '@angular/core/rxjs-interop';

interface AreaSelectOption extends SelectOption {
  id: string;
}

const COMMENT_SEPARATOR = ': ';
@Component({
  selector: 'app-add-or-edit-danger-obs-modal',
  templateUrl: './add-or-edit-danger-obs-modal.page.html',
  styleUrls: ['./add-or-edit-danger-obs-modal.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    ModalSaveOrDeleteButtonsComponent,
    NgIf,
    SelectComponent,
    TextCommentComponent,
    TranslatePipe,
  ],
})
export class AddOrEditDangerObsModalPage {
  private modalController = inject(ModalController);
  private translateService = inject(TranslateService);

  readonly dangerObs = input<DangerObsEditModel>();
  readonly geoHazard = input.required<GeoHazard>();

  kdvKey = computed(() => getKdvKey(this.geoHazard()));
  showNoDangerSignCheckbox = computed(() => this.geoHazard() != GeoHazard.Ice);
  dangerSignTid = linkedSignal(() => this.dangerObs()?.DangerSignTID);
  noDangerSignTid = computed(() => getNoDangerSignTid(this.geoHazard()));
  isNoDangerSign = computed(() => this.dangerSignTid() === this.noDangerSignTid());
  showDangerSignSelect = computed(() => {
    if (this.geoHazard() === GeoHazard.Ice) {
      return true;
    }
    return !this.isNoDangerSign();
  });

  areaOptions = computed(() => {
    const translations = this.translateService.instant(getAreaTranslationKeys(this.geoHazard()));
    // TODO: Test if this is sorted proparly, probably not.
    //    if not sorted, use the order in translationkeys...
    const values: string[] = Object.values(translations);
    return values.map((v) => ({ id: v, text: v }) as AreaSelectOption);
  });

  // Valgt område er bare et app-konsept og finnes ikke i DangerObsEditModel, men lagres i Comment.
  areaAndComment = computed(() =>
    parseAreaAndComment(this.areaOptions(), this.getCommentTranslations(), this.dangerObs()?.Comment)
  );
  area = linkedSignal(() => this.areaAndComment().area);
  comment = linkedSignal(() => this.areaAndComment().comment);

  toggleNoDangerSign() {
    this.dangerSignTid.update((tid) => {
      const noDangerSignTid = this.noDangerSignTid();
      if (tid === noDangerSignTid) {
        // Was checked
        return undefined;
      } else {
        return noDangerSignTid;
      }
    });
  }

  ok() {
    const dangerObsToSave: DangerObsEditModel = {
      GeoHazardTID: this.geoHazard(),
      DangerSignTID: this.getDangerSignTidOrFallback(),
      Comment: this.getCombinedComment(),
    };
    this.modalController.dismiss(dangerObsToSave);
  }

  cancel() {
    this.modalController.dismiss();
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  private getCommentTranslations(): TranslationObject {
    return this.translateService.instant(['REGISTRATION.DANGER_OBS.AREA', 'REGISTRATION.DANGER_OBS.DESCRIPTION']);
  }

  private getDangerSignTidOrFallback() {
    const dangerSignTid = this.dangerSignTid();
    if (dangerSignTid != null) {
      return dangerSignTid;
    }
    const geoHazard = this.geoHazard();
    return getNotGivenDangerSignTid(geoHazard);
  }

  private getCombinedComment() {
    const area = this.area();
    const comment = this.comment();

    if (!area) {
      return comment;
    }

    const translations = this.getCommentTranslations();
    const { short, long } = getAreaPartOfComment(translations, area);
    if (comment) {
      return long + comment;
    }
    return short;
  }
}

function getAreaTranslationKeys(geoHazard: GeoHazard) {
  switch (geoHazard) {
    case GeoHazard.Ice: {
      return [
        'REGISTRATION.DANGER_OBS.RIGHT_HERE',
        'REGISTRATION.DANGER_OBS.ON_THIS_SIDE_OF_THE_WATER',
        'REGISTRATION.DANGER_OBS.ON_THIS_WATER',
        'REGISTRATION.DANGER_OBS.MANY_WATER_NEARBY',
      ];
    }
    default:
      return [
        'REGISTRATION.DANGER_OBS.ON_THIS_PLACE',
        'REGISTRATION.DANGER_OBS.ON_THIS_MOUNTAIN_SIDE',
        'REGISTRATION.DANGER_OBS.GENERAL_ON_MOUNTAIN',
        'REGISTRATION.DANGER_OBS.IN_THE_VALLEY_OR_FJORD',
        'REGISTRATION.DANGER_OBS.FOR_MUNICIPAL',
        'REGISTRATION.DANGER_OBS.FOR_REGION',
      ];
  }
}

function getNotGivenDangerSignTid(geoHazard: GeoHazard) {
  return geoHazard !== GeoHazard.Snow ? geoHazard * 10 : 0;
}

function getNoDangerSignTid(geoHazard: GeoHazard) {
  return (geoHazard !== GeoHazard.Snow ? geoHazard * 10 : 0) + 1;
}

function getKdvKey(geoHazard: GeoHazard): KdvKey {
  if (geoHazard == GeoHazard.Snow) {
    return 'Snow_DangerSignKDV';
  }
  if (geoHazard == GeoHazard.Ice) {
    return 'Ice_DangerSignKDV';
  }
  if (geoHazard == GeoHazard.Water) {
    return 'Water_DangerSignKDV';
  }
  if (geoHazard == GeoHazard.Soil) {
    return 'Dirt_DangerSignKDV';
  }
  throw new Error(`Unsupported geohazard: ${geoHazard}`);
}

function parseSelectedAreaFromComment(areaOptions: AreaSelectOption[], comment?: string) {
  if (comment == null) {
    return;
  }

  return areaOptions.find((v) => comment.indexOf(v.id as string) >= 0);
}

function getAreaPartOfComment(translations: TranslationObject, area: string) {
  const areaDesc = translations['REGISTRATION.DANGER_OBS.AREA'];
  const commentDesc = translations['REGISTRATION.DANGER_OBS.DESCRIPTION'];
  const short = `${areaDesc}${COMMENT_SEPARATOR}${area}`;
  return {
    short, // "Område: Generelt på fjellet"
    long: `${short}. ${commentDesc}${COMMENT_SEPARATOR}`, // "Område: Generelt på fjellet. Beskrivelse: "
  };
}

function removeAreaFromComment(translations: TranslationObject, comment: string | undefined, area: string) {
  const areaPart = getAreaPartOfComment(translations, area);

  if (!areaPart || !comment) {
    return comment;
  }

  if (areaPart.short.length === comment.length) {
    return; // No user comment, Comment only contains area part
  }
  return comment.replace(areaPart.long, '');
}

function parseAreaAndComment(options: AreaSelectOption[], translations: TranslationObject, comment?: string) {
  // Valgt område er bare et app-konsept og finnes ikke i DangerObsEditModel, men lagres i Comment.
  const area = parseSelectedAreaFromComment(options, comment)?.id;
  const strippedComment = area == null ? comment : removeAreaFromComment(translations, comment, area);
  return {
    area,
    comment: strippedComment,
  };
}
