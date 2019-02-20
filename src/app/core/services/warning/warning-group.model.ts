import { WarningGroupKey } from './warning-group-key.interface';
import * as moment from 'moment';
import { IWarningGroup } from './warning-group.interface';

export class WarningGroup {
    private _warningGroup: IWarningGroup;

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

    get groupType() {
        return this._warningGroup.regionType;
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

    get sortOrder() {
        return this._warningGroup.sortOrder;
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

    getDayWarning(daysToAdd: number) {
        const day = moment().startOf('day').add(daysToAdd, 'days');
        return this.getWarningForDay(day.toDate());
    }

    hasAnyWarnings(daysAhead = 2) {
        return this.getMaxWarning(daysAhead) > 0;
    }

    getMaxWarning(daysAhead = 2) {
        let max = 0;
        for (let i = 0; i <= daysAhead; i++) {
            const dayWarning = this.getDayWarning(i);
            if (dayWarning && dayWarning.warningLevel > max) {
                max = dayWarning.warningLevel;
            }
        }
        return max;
    }

    constructor(group: IWarningGroup) {
        this._warningGroup = group;
    }
}
