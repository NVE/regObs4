import { RegObsGenericValue } from '@varsom-regobs-common/regobs-api';
import { SummaryKind } from './summary-kind.enum';

export class UrlSummary implements RegObsGenericValue {
    readonly Kind = SummaryKind.Url;
    readonly KindType = 'Url';

    private _header: string;
    private _value: string;

    get Header() {
      return this._header;
    }

    set Header(header: string) {
      this._header = header;
    }

    get Value() {
      return this.ensureValidUrl(this._value);
    }

    set Value(value: string) {
      this._value = value;
    }

    constructor(header: string, value: string) {
      this._header = header;
      this._value = value;
    }

    private ensureValidUrl(url: string) {
      const validProtocols = ['http', 'https'];
      if (url && url.length > 0 && !validProtocols.some((vp) => url.toLocaleLowerCase().startsWith(vp))) {
        const pIndex = url.indexOf('://');
        if (pIndex >= 0) {
          return `http://${url.substr(pIndex + 3)}`;
        }

        return `http://${url}`;
      }
      return url;
    }

}
