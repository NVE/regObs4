import { TestBed } from "@angular/core/testing";
import moment from "moment";
import { GeoHazard } from "src/app/modules/common-core/models";
import { SyncStatus } from "src/app/modules/common-registration/registration.models";
import { DraftRepository } from "./draft-repository";
import { DraftRepositoryService } from "./draft-repository.service";

describe('DraftRepositoryService', () => {
    let repository: DraftRepository;
  
    beforeEach(() => {
        TestBed.configureTestingModule({});
        repository = TestBed.inject(DraftRepositoryService);
    });

    it('create() should return an empty registration', () => {
        const actualIceRegistration = repository.create(GeoHazard.Ice);
        expect(actualIceRegistration.geoHazard).toBe(GeoHazard.Ice);
        expect(actualIceRegistration.syncStatus).toBe(SyncStatus.Draft);
        expect(actualIceRegistration.id.length).toBeGreaterThan(0);
        expect(actualIceRegistration.changed).toBeGreaterThanOrEqual(moment().unix());
        expect(actualIceRegistration.request.GeoHazardTID).toBe(GeoHazard.Ice);
        expect(actualIceRegistration.request.DtObsTime).toBe(undefined);
        expect(actualIceRegistration.request.ObsLocation).toEqual({ Latitude: 0, Longitude: 0 });
        expect(actualIceRegistration.request.Attachments).toEqual([]);
    });
});
  