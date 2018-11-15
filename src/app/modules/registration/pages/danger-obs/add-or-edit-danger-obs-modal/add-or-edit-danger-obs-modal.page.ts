import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DangerObsDto } from '../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { GeoHazard } from '../../../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';

const COMMENT_SEPARATOR = ': ';
@Component({
  selector: 'app-add-or-edit-danger-obs-modal',
  templateUrl: './add-or-edit-danger-obs-modal.page.html',
  styleUrls: ['./add-or-edit-danger-obs-modal.page.scss'],
})
export class AddOrEditDangerObsModalPage implements OnInit {

  @Input() dangerObs: DangerObsDto;
  @Input() geoHazard: GeoHazard;
  noDangerObs = false;
  areaArr: string[];
  tmpArea = '';
  dangerSignTid: number;
  comment: string;
  loaded = false;

  interfaceOptions = {

  };

  get GeoHazardName() {
    return GeoHazard[this.geoHazard];
  }

  constructor(
    private modalController: ModalController,
    private translateService: TranslateService,
    private ngZone: NgZone) { }

  async ngOnInit() {
    const tranlations = await this.translateService.get(this.getAreaArray()).toPromise();
    this.areaArr = this.getAreaArray().map((item) => tranlations[item] as string);

    if (this.dangerObs) {
      if (this.dangerObs.Comment) {
        this.tmpArea = this.areaArr.find((x) => this.dangerObs.Comment.indexOf(x) >= 0);
        if (this.tmpArea) {
          const index = this.tmpArea.length + COMMENT_SEPARATOR.length;
          this.comment =
            this.dangerObs.Comment.substr(index);
        } else {
          this.comment = this.dangerObs.Comment;
        }
      }
      if (this.dangerObs.DangerSignTID === this.getZeroValue()) {
        this.noDangerObs = true;
      } else {
        this.dangerSignTid = this.dangerObs.DangerSignTID;
      }
    }
    this.loaded = true;
  }

  toggleDangerObs() {
    this.ngZone.run(() => {
      this.noDangerObs = !this.noDangerObs;
      console.log('No danger obs: ', this.noDangerObs);
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

  getZeroValue() {
    return this.geoHazard !== GeoHazard.Snow ? this.geoHazard * 10 : 0;
  }

  ok() {
    const dangerObsToSave: DangerObsDto = {
      GeoHazardTID: this.geoHazard,
      DangerSignTID: this.noDangerObs ? this.getZeroValue() : this.dangerSignTid,
      Comment: this.getComment(),
    };
    this.modalController.dismiss(dangerObsToSave);
  }

  private getComment() {
    if (this.tmpArea) {
      return `${this.tmpArea}${COMMENT_SEPARATOR}${this.comment || ''}`;
    } else {
      return this.comment;
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  getAreaArray() {
    switch (this.geoHazard) {
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
          'REGISTRATION.DANGER_OBS.FOR_REGION'
        ];
    }
  }
}
