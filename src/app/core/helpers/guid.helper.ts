export class GuidHelper {
    private static S4() {
        // tslint:disable-next-line:no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    static createGuid() {
        return (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3)
            + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
    }
}
