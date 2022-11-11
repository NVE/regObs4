import { GeoHazard } from 'src/app/modules/common-core/models';
import { BasePageService } from '../../base-page-service';
import { AvalancheObsPage } from './avalanche-obs.page';
import 'leaflet.markercluster';


describe('AvalancheObsPage', () => {
  let component: AvalancheObsPage;
  beforeEach(() => {
    const basePageService = new BasePageService(null, null, null, null, null);
    component = new AvalancheObsPage(basePageService, null, null);
    component.draft = {
      registration: {
        DtObsTime: new Date(2020, 0, 1).toISOString(),
        GeoHazardTID: GeoHazard.Snow,
        Incident: {},
        AvalancheObs: {
          DtAvalancheTime: new Date(2020, 0, 1).toISOString()
        }
      },
      uuid: null,
      syncStatus: null,
      simpleMode: false,
    };
  });
  it('empty incident is valid', () => {
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

  it('Number of harmed is higher than number of involved, is not valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
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

  it('Form is valid', () => {
    component.draft.registration.Incident.InvolvedNum = 6;
    component.draft.registration.Incident.CasualtiesNum = 5;
    component.draft.registration.Incident.DeadNum = 3;
    component.draft.registration.Incident.HarmedNum = 2;
    expect(component.isValid()).toBeTrue();
  });
});
