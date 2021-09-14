import { RegObsGenericValue } from '@varsom-regobs-common/regobs-api';
import { SummaryKind } from './summary-kind.enum';

export class TextSummary implements RegObsGenericValue {
    readonly Kind = SummaryKind.Text;
    readonly KindType = 'Text';

    private _header: string;
    private _value: string;

    get Header() {
      return this._header;
    }

    set Header(header: string) {
      this._header = header;
    }

    get Value() {
      return this._value;
    }

    set Value(value: string) {
      this._value = value;
    }

    constructor(header: string, value: string) {
      this._header = header;
      this._value = value;
    }

}
