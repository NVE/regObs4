import { RegionSummary } from './snow/region-summary.model';
import { LandslideWarning } from './landslide/landslide-warning.model';
import * as moment from 'moment';
import { AvalancheWarningSimple } from './snow/avalanche-warning-simple.model';
import { settings } from '../../../../settings';
import 'moment-timezone';
import { GeoHazard } from '../../models/geo-hazard.enum';

export class Warning {
    private item: LandslideWarning | AvalancheWarningSimple;
    private _geoHazard: GeoHazard;

    get validFrom() {
        return this.toDate(this.item.ValidFrom);
    }

    get validTo() {
        return this.toDate(this.item.ValidTo);
    }

    get nextWarningTime() {
        return this.toDate(this.item.NextWarningTime);
    }

    get mainText() {
        return this.item.MainText;
    }

    get dangerLevel() {
        if (this._geoHazard === GeoHazard.Dirt) {
            return (this.item as LandslideWarning).ActivityLevel;
        }
        if (this._geoHazard === GeoHazard.Snow) {
            return (this.item as AvalancheWarningSimple).DangerLevel;
        }
        return 0;
    }

    get geoHazard() {
        return this._geoHazard;
    }

    private toDate(stringDate: string) {
        return moment.tz(stringDate, settings.services.warning.timezone).toDate();
    }

    constructor(geoHazard: GeoHazard, item: LandslideWarning | AvalancheWarningSimple) {
        this._geoHazard = geoHazard;
        this.item = item;
    }
}
