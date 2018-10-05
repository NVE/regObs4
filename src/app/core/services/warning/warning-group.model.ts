import { WarningGroupKey } from './warning-group-key.interface';
import { IWarning } from './warning.interface';
import * as moment from 'moment';

export class WarningGroup {
    private _group: WarningGroupKey;
    private _warnings: IWarning[];

    get group() {
        return this._group;
    }

    get warnings() {
        return this._warnings;
    }

    getWarningForDay(date: Date) {
        const warningsForDay = this._warnings.filter((x) => moment(date).isBetween(x.validFrom, x.validTo, null, '[]'));
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

    constructor(group: WarningGroupKey, warnings: IWarning[]) {
        this._group = group;
        this._warnings = warnings;
    }
}
