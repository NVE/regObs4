export class NumberHelper {
    static isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static setDecimalPlaces(n: number, decimalPlaces?: number) {
        if (this.isNumeric(n)) {
            return parseFloat(n.toFixed(decimalPlaces));
        } else {
            return n;
        }
    }
}
