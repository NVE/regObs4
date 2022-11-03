import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import * as L from 'leaflet';
import { SetAvalanchePositionPage } from '../../set-avalanche-position/set-avalanche-position.page';
import moment from 'moment';
import { SelectOption } from '../../../../shared/components/input/select/select-option.model';
import { AvalancheObsEditModel, IncidentEditModel } from 'src/app/modules/common-regobs-api';
import { createEmptyRegistration } from 'src/app/modules/common-registration/registration.helpers';


/**
 * Used to register both avalanche observations and incidents, so this page contains two forms.
 * You can also upload images which will be attached to the avalanche observation.
 */
@Component({
  selector: 'app-avalanche-obs',
  templateUrl: './avalanche-obs.page.html',
  styleUrls: ['./avalanche-obs.page.scss']
})
export class AvalancheObsPage extends BasePage {
  expoArray: SelectOption[] = [
    {
      text: 'DIRECTION.N',
      id: '10000000'
    },
    {
      text: 'DIRECTION.NE',
      id: '01000000'
    },
    {
      text: 'DIRECTION.E',
      id: '00100000'
    },
    {
      text: 'DIRECTION.SE',
      id: '00010000'
    },
    {
      text: 'DIRECTION.S',
      id: '00001000'
    },
    {
      text: 'DIRECTION.SW',
      id: '00000100'
    },
    {
      text: 'DIRECTION.W',
      id: '00000010'
    },
    {
      text: 'DIRECTION.NW',
      id: '00000001'
    }
  ];

  showWarning = false;
  maxDate: string;

  get avalancheObs(): AvalancheObsEditModel {
    return this.draft.registration.AvalancheObs;
  }

  get incident(): IncidentEditModel {
    return this.draft.registration.Incident;
  }

  get dateIsDifferentThanObsTime() {
    return (
      this.avalancheObs.DtAvalancheTime &&
      !moment(this.avalancheObs.DtAvalancheTime)
        .startOf('day')
        .isSame(moment(this.draft.registration.DtObsTime).startOf('day'))
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

  /**
   * If InvolvedNum is set then:
   * CasualtiesNum must be equal to or less than InvolvedNum.
   * DeadNum must be equal to or less than CasualtiesNum.
   * All numbers must be >= 0.
   * CasualtiesNum and DeadNum can be empty.
   * DtAvalancheTime must be set.
   */
  isValid() {
    this.showWarning = true;

    const {
      InvolvedNum: antallInvolvert,
      CasualtiesNum: antallSkadet,
      DeadNum: antallDode
    } = this.incident;

    let isInvolvedValid = true, isCasualtiesValid = true, isDeadValid = true;

    if (antallInvolvert) {
      isInvolvedValid = antallInvolvert >= 0;
      isCasualtiesValid = antallSkadet === undefined || antallSkadet <= antallInvolvert;
      isDeadValid = antallDode === undefined || antallDode <= antallSkadet;
    }

    return !!this.avalancheObs.DtAvalancheTime && isInvolvedValid && isCasualtiesValid && isDeadValid;

  }

  async isEmpty(): Promise<boolean> {
    const isEmpty = await super.isEmpty();
    if (!isEmpty) {
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
      ? L.latLng(
        this.draft.registration.ObsLocation.Latitude,
        this.draft.registration.ObsLocation.Longitude
      )
      : null;
    const startLatLng =
      this.avalancheObs.StartLat &&
      this.avalancheObs.StartLong
        ? L.latLng(
          this.avalancheObs.StartLat,
          this.avalancheObs.StartLong
        )
        : null;
    const endLatLng =
      this.avalancheObs.StopLat &&
      this.avalancheObs.StopLong
        ? L.latLng(
          this.avalancheObs.StopLat,
          this.avalancheObs.StopLong
        )
        : null;
    const modal = await this.modalController.create({
      component: SetAvalanchePositionPage,
      componentProps: {
        relativeToLatLng,
        startLatLng,
        endLatLng,
        geoHazard: this.draft.registration.GeoHazardTID
      }
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
    }
  }
}
