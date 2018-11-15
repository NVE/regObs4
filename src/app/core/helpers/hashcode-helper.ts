export class HashcodeHelper {
    static getHashCode(s: string) {
        let h = 0;
        if (!s) {
            return h;
        }
        for (let i = 0; i < s.length; i++) {
            // tslint:disable-next-line:no-bitwise
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h;
    }
}
