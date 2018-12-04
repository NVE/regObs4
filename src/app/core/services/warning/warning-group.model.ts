import { WarningGroupKey } from './warning-group-key.interface';
import * as moment from 'moment';
import { IWarningGroup } from './warning-group.interface';

export class WarningGroup {
    private _warningGroup: IWarningGroup;
    private _isFavourite: boolean;

    get key(): WarningGroupKey {
        return {
            geoHazard: this._warningGroup.geoHazard,
            groupId: this._warningGroup.regionId,
            groupName: this._warningGroup.regionName
        };
    }

    get warnings() {
        return this._warningGroup.warnings;
    }

    get isFavourite() {
        return this._isFavourite;
    }

    get url() {
        return this._warningGroup.url;
    }

    get counties() {
        return this._warningGroup.counties;
    }

    get validFrom() {
        return this._warningGroup.validFrom;
    }

    get validTo() {
        return this._warningGroup.validTo;
    }

    getWarningForDay(date: Date) {
        const warningsForDay = this._warningGroup.warnings.filter((x) => moment(date).isBetween(x.validFrom, x.validTo, null, '[]'));
        if (warningsForDay.length > 0) {
            return warningsForDay.reduce((pv, v) => {
                if (pv && pv.warningLevel < v.warningLevel) {
                    return pv;
                } else {
                    return v;
                }
            });
        } else {
            return warningsForDay[0];
        }
    }

    constructor(group: IWarningGroup, isFavourite?: boolean) {
        this._warningGroup = group;
        this._isFavourite = isFavourite;
    }
}
