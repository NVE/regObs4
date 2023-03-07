import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import moment from 'moment';
import { IncidentValidation } from 'src/app/core/helpers/incident-validation';
import {
  createEmptyRegistration,
  hasAnyDataBesidesPropertyToExclude,
} from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { AvalancheObsEditModel, IncidentEditModel } from 'src/app/modules/common-regobs-api';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { BasePageService } from '../../base-page-service';
import { BasePage } from '../../base.page';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';

/**
 * Used to register both avalanche observations and incidents, so this page contains two forms.
 * You can also upload images which will be attached to the avalanche observation.
 */
@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss'],
})
export class AvalancheObsPage extends BasePage {
  expoArray: SelectOption[] = [
    {
      text: 'DIRECTION.N',
      id: '10000000',
    },
    {
      text: 'DIRECTION.NE',
      id: '01000000',
    },
    {
      text: 'DIRECTION.E',
      id: '00100000',
    },
    {
      text: 'DIRECTION.SE',
      id: '00010000',
    },
    {
      text: 'DIRECTION.S',
      id: '00001000',
    },
    {
      text: 'DIRECTION.SW',
      id: '00000100',
    },
    {
      text: 'DIRECTION.W',
      id: '00000010',
    },
    {
      text: 'DIRECTION.NW',
      id: '00000001',
    },
  ];

  showWarning = false;
  maxDate: string;

  isInvolvedValid = true;
  isCasualtiesValid = true;
  isDeadValid = true;
  isHarmedValid = true;
  isErrorMessageHarmAndDead = false;

  get avalancheObs(): AvalancheObsEditModel {
    return this.draft.registration.AvalancheObs;
  }

  get incident(): IncidentEditModel {
    return this.draft.registration.Incident;
  }

  get dayIsDifferentThanObsTime() {
    return (
      this.avalancheObs.DtAvalancheTime &&
      !moment(this.avalancheObs.DtAvalancheTime)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
    );
  }

  get dateIsDifferentThanObsTime() {
    return (
      this.avalancheObs.DtAvalancheTime &&
      !moment(this.avalancheObs.DtAvalancheTime).isSame(this.draft.registration.DtObsTime)
    );
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {
    super(RegistrationTid.AvalancheObs, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.draft.registration.Incident) {
      this.draft.registration.Incident = {};
    }
    this.maxDate = this.getMaxDateForNow();
    if (!this.avalancheObs.DtAvalancheTime) {
      this.avalancheObs.DtAvalancheTime = this.draft.registration.DtObsTime;
    }
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  async reset() {
    const pleaseReset = await super.reset();
    if (pleaseReset) {
      // Also create new empty incident form
      this.draft = createEmptyRegistration(this.draft, RegistrationTid.Incident);
    }
    return pleaseReset;
  }

  protected async delete() {
    //delete both forms
    this.draft = await this.basePageService.delete(this.draft, [this.registrationTid, RegistrationTid.Incident]);
  }

  groupValidate() {
    this.isCasualtiesValid = IncidentValidation.onCasualtiesNumChange(this.incident);
    this.isDeadValid = IncidentValidation.onDeadNumChange(this.incident);
    this.onHarmedChange();
  }

  onHarmedChange() {
    if (
      (isNaN(this.incident.CasualtiesNum) &&
        isNaN(this.incident.DeadNum) &&
        this.incident.HarmedNum > this.incident.InvolvedNum) ||
      (isNaN(this.incident.DeadNum) && this.incident.HarmedNum > this.incident.InvolvedNum)
    ) {
      this.isHarmedValid = false;
    } else if (
      !isNaN(this.incident.DeadNum) &&
      (this.incident.DeadNum + this.incident.HarmedNum > this.incident.CasualtiesNum ||
        this.incident.DeadNum + this.incident.HarmedNum > this.incident.InvolvedNum)
    ) {
      this.isHarmedValid = false;
      this.isDeadValid = false;
      this.isErrorMessageHarmAndDead = true;
    } else {
      this.isHarmedValid = true;
      this.isErrorMessageHarmAndDead = false;
    }
  }

  isValid() {
    this.showWarning = true;

    this.groupValidate();

    return (
      !!this.avalancheObs.DtAvalancheTime &&
      this.isInvolvedValid &&
      this.isCasualtiesValid &&
      this.isDeadValid &&
      this.isHarmedValid
    );
  }

  async isEmpty(): Promise<boolean> {
    if (
      this.avalancheObs.DtAvalancheTime &&
      (hasAnyDataBesidesPropertyToExclude(this.avalancheObs, 'DtAvalancheTime') || this.dateIsDifferentThanObsTime)
    ) {
      return false;
    }

    const isIncidentEmpty = await super.isEmpty(RegistrationTid.Incident);
    return isIncidentEmpty;
  }

  setAvalancheTimeTimeToNow() {
    this.avalancheObs.DtAvalancheTime = moment().toISOString(true);
  }

  async setAvalanchePosition() {
    const relativeToLatLng = this.draft.registration.ObsLocation
      ? L.latLng(this.draft.registration.ObsLocation.Latitude, this.draft.registration.ObsLocation.Longitude)
      : null;
    const startLatLng =
      this.avalancheObs.StartLat && this.avalancheObs.StartLong
        ? L.latLng(this.avalancheObs.StartLat, this.avalancheObs.StartLong)
        : null;
    const endLatLng =
      this.avalancheObs.StopLat && this.avalancheObs.StopLong
        ? L.latLng(this.avalancheObs.StopLat, this.avalancheObs.StopLong)
        : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        extent: this.avalancheObs.Extent,
        startExtent: this.avalancheObs.StartExtent,
        endExtent: this.avalancheObs.StopExtent,
        geoHazard: this.draft.registration.GeoHazardTID,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const start: L.LatLng = result.data.start;
      const end: L.LatLng = result.data.end;
      this.avalancheObs.StartLat = start.lat;
      this.avalancheObs.StartLong = start.lng;
      this.avalancheObs.StopLat = end.lat;
      this.avalancheObs.StopLong = end.lng;
      this.avalancheObs.Extent = result.data.totalPolygon;
      this.avalancheObs.StartExtent = result.data.startPolygon;
      this.avalancheObs.StopExtent = result.data.endPolygon;
    }
  }
}
