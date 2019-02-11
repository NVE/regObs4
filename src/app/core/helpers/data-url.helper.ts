const BASE64_MARKER = ';base64,';

export class DataUrlHelper {

    static async toDataUrlWithSize(blob: Blob, mimeType: string): Promise<{ dataUrl: string, size: number }> {
        const dataUrl = await this.toDataUrl(blob, mimeType);
        return { size: blob.size, dataUrl };
    }

    static toDataUrl(blob: Blob, mimeType: string) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(this.ensureCorrectMimeType(reader.result as string, mimeType));
            reader.onerror = () => reject();
            reader.readAsDataURL(blob);
        });
    }

    private static ensureCorrectMimeType(dataUrl: string, mimeType: string) {
        if (dataUrl.startsWith(`data:${mimeType};`)) {
            return dataUrl;
        } else {
            const index = dataUrl.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            return `data:${mimeType}${BASE64_MARKER}${dataUrl.substr(index)}`;
        }
    }

    static convertDataURIToBinary(dataUri: string) {
        const index = dataUri.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        const base64 = dataUri.substring(index);
        const raw = atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    static getDataUriByteLength(dataUri: string) {
        const blob = this.convertDataURIToBinary(dataUri);
        return blob.length;
    }

    static getDataUrlFromImageOnLoad(img: HTMLImageElement, format = 'image/jpeg'): Promise<string> {
        return new Promise((resolve, reject) => {
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // Get raw image data
                resolve(this.getDataUrlFromImage(img, format));
            };
            img.onerror = () => reject();
        });
    }

    static getDataUrlFromImage(img: HTMLImageElement, format = 'image/jpeg'): string {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        // Get raw image data
        return canvas.toDataURL(format);
    }
}
