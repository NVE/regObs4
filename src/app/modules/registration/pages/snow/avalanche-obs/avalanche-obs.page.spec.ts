import { GeoHazard } from 'src/app/modules/common-core/models';
import { AvalancheObsPage } from './avalanche-obs.page';
import 'leaflet.markercluster';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideTranslateService } from '@ngx-translate/core';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';

describe('AvalancheObsPage', () => {
  let component: AvalancheObsPage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideIonicAngular(),
        provideTestLogger(),
        provideTranslateService(),
        { provide: DraftRepositoryService, useValue: null },
        { provide: NewAttachmentService, useValue: null },
      ],
    });
    const fixture = TestBed.createComponent(AvalancheObsPage);
    component = fixture.componentInstance;

    component.draft = {
      registration: {
        DtObsTime: new Date(2020, 0, 1).toISOString(),
        GeoHazardTID: GeoHazard.Snow,
        Incident: {},
        AvalancheObs: {
          DtAvalancheTime: new Date(2020, 0, 1).toISOString(),
        },
      },
      uuid: null,
      syncStatus: null,
      simpleMode: false,
    };
  });
  it('empty incident is valid', () => {
    expect(component.isValid()).toBeTrue();
  });

  it('Number of casualties is given without number involved, is valid', () => {
    component.draft.registration.Incident.CasualtiesNum = 7;
    expect(component.isValid()).toBeTrue();
  });

  it('Number of dead is given without number casualties or involved, is valid', () => {
    component.draft.registration.Incident.DeadNum = 7;
    expect(component.isValid()).toBeTrue();
  });

  it('Number of casualties higher than number involved, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 5;
    component.draft.registration.Incident.CasualtiesNum = 7;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of dead higher than number of casualties, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.CasualtiesNum = 4;
    component.draft.registration.Incident.DeadNum = 5;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of dead higher than number of involved without casualties, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.DeadNum = 7;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of harmed is higher than number of involved, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.CasualtiesNum = 3;
    component.draft.registration.Incident.HarmedNum = 7;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of harmed and dead is higher than number of casualties, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.CasualtiesNum = 4;
    component.draft.registration.Incident.DeadNum = 3;
    component.draft.registration.Incident.HarmedNum = 3;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of harmed and dead is higher than number of involved without casualties specified, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.DeadNum = 4;
    component.draft.registration.Incident.HarmedNum = 3;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of harmed and dead is higher than number of casualties without involved specified, is not valid', () => {
    component.draft.registration.Incident.CasualtiesNum = 4;
    component.draft.registration.Incident.DeadNum = 3;
    component.draft.registration.Incident.HarmedNum = 3;
    expect(component.isValid()).toBeFalse();
  });

  it('Number of harmed and dead without casualties and involved, is valid', () => {
    component.draft.registration.Incident.DeadNum = 3;
    component.draft.registration.Incident.HarmedNum = 3;
    expect(component.isValid()).toBeTrue();
  });

  it('Form is valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.CasualtiesNum = 5;
    component.draft.registration.Incident.DeadNum = 3;
    component.draft.registration.Incident.HarmedNum = 2;
    expect(component.isValid()).toBeTrue();
  });
});
