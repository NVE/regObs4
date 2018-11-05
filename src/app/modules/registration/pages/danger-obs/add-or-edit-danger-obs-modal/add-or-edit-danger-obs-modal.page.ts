import { Component, OnInit, Input } from '@angular/core';
import { DangerObsDto } from '../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { GeoHazard } from '../../../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-or-edit-danger-obs-modal',
  templateUrl: './add-or-edit-danger-obs-modal.page.html',
  styleUrls: ['./add-or-edit-danger-obs-modal.page.scss'],
})
export class AddOrEditDangerObsModalPage implements OnInit {

  @Input() dangerObs: DangerObsDto;
  @Input() geoHazard: GeoHazard;
  dangerObsToSave: DangerObsDto;
  isNew = true;
  noDamageObs = false;
  areaArr: string[];
  tmpArea = '';

  interfaceOptions = {

  };

  get GeoHazardName() {
    return GeoHazard[this.geoHazard];
  }

  constructor(private modalController: ModalController, private translateService: TranslateService) { }

  async ngOnInit() {
    const tranlations = await this.translateService.get(this.getAreaArray()).toPromise();
    this.areaArr = this.getAreaArray().map((item) => tranlations[item] as string);

    if (this.dangerObs) {
      this.dangerObsToSave = { ...this.dangerObs };
      if (this.dangerObs.Comment) {
        this.tmpArea = this.areaArr.find((x) => this.dangerObs.Comment.indexOf(x) >= 0);
      }
      this.isNew = false;
    } else {
      this.dangerObsToSave = {
        DangerSignTID: 0
      };
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    this.modalController.dismiss(this.dangerObsToSave);
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  getAreaArray() {
    switch (this.geoHazard) {
      case GeoHazard.Dirt: {
        return [
          'REGISTRATION.DANGER_OBS.ON_THIS_PLACE',
          'REGISTRATION.DANGER_OBS.ON_THIS_MOUNTAIN_SIDE',
          'REGISTRATION.DANGER_OBS.GENERAL_ON_MOUNTAIN',
          'REGISTRATION.DANGER_OBS.IN_THE_VALLEY_OR_FJORD',
          'REGISTRATION.DANGER_OBS.FOR_MUNICIPAL',
          'REGISTRATION.DANGER_OBS.FOR_REGION'
        ];
      }
      default:
        return [];
    }
  }
}
