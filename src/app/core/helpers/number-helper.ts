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

    static isNullOrEmpty(n: any) {
        return n === undefined || n === null || n === '';
    }

    static isValid(n: any, min?: number, max?: number, required = false, integer = false) {
        if (required && this.isNullOrEmpty(n)) {
            return false;
        }
        if (!required && this.isNullOrEmpty(n)) {
            return true;
        }
        if (!this.isNumeric(n)) {
            return false;
        }
        const nNumverValue = parseFloat(n);
        if (integer && !Number.isInteger(nNumverValue)) {
            return false;
        }
        if (min !== undefined && nNumverValue < min) {
            return false;
        }
        if (max !== undefined && nNumverValue > max) {
            return false;
        }
        return true;
    }
}
