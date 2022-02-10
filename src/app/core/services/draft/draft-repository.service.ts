import { Injectable } from "@angular/core";
import moment from "moment";
import { Observable } from "rxjs";
import { uuidv4 } from "src/app/modules/common-core/helpers";
import { GeoHazard } from "src/app/modules/common-core/models";
import { IRegistration, SyncStatus } from "src/app/modules/common-registration/registration.models";
import { DraftRepository } from "./draft-repository";

@Injectable({
    providedIn: 'root'
})
export class DraftRepositoryService implements DraftRepository {
    
    create(geoHazard: GeoHazard): IRegistration {
        const id = uuidv4();
        const draft: IRegistration = {
          id,
          geoHazard,
          changed: moment().unix(),
          syncStatus: SyncStatus.Draft,
          request: {
            GeoHazardTID: geoHazard,
            DtObsTime: undefined,
            ObsLocation: { Latitude: 0, Longitude: 0 },
            Attachments: []
          }
        };
        return draft;
    }
    
    save(registration: IRegistration): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    delete(registration: IRegistration): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    getDrafts(): Promise<IRegistration[]> {
        throw new Error("Method not implemented.");
    }
    
    getDraftsUnderSubmission$(): Observable<IRegistration[]> {
        throw new Error("Method not implemented.");
    }
}  