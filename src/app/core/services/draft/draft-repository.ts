import { Observable } from "rxjs";
import { GeoHazard } from "src/app/modules/common-core/models";
import { IRegistration } from "src/app/modules/common-registration/models/registration.interface";


/**
 * Takes care of your draft registrations and save them on your device.
 * A draft registration is registration that is not submitted to the server.
 * It can be a new registration or an earlier submitted registration changed by you.
 */
export interface DraftRepository {
    /**
     * Create a new empty registration
     * @param geoHazard the geo hazard you have observed
     * @returns the registration
     * TODO: Bør denne returnere et Promise?
     */
    create(geoHazard: GeoHazard): IRegistration;

    /**
     * Save a registration on device
     * @param registration the registration to save
     */
    save(registration: IRegistration): Promise<void>;

    /**
     * Delete a registration from your device
     * The registration will NOT be deleted from server if you have submitted it 
     * @param registration the registration to delete
     */
    delete(registration: IRegistration): Promise<void>;

    /**
     * @returns a list of drafts that are saved locally
     * TODO: Skal kladder som er under innsending være med i denne?
     * TODO: Bør denne være en Observable?
     */
     getDrafts(): Promise<IRegistration[]>;

    /**
     * Returns a list of drafts that are on their way to the server. 
     * When they are received by the server, they will be removed from the list.
     */
    getDraftsUnderSubmission$(): Observable<IRegistration[]>;
}