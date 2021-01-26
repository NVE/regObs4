import { Observable, of } from 'rxjs';

const BASE64_MARKER = ';base64,';

export class DataUrlHelper {
  static async toDataUrlWithSize(
    blob: Blob,
    mimeType: string
  ): Promise<{ dataUrl: string; size: number }> {
    const dataUrl = await this.toDataUrl(blob, mimeType);
    return { size: blob.size, dataUrl };
  }

  static async toDataUrlWithSizeFromArrayBuffer(
    buffer: ArrayBuffer,
    mimeType: string
  ): Promise<{ dataUrl: string; size: number }> {
    const dataUrl = await this.toDataUrl(
      new Blob([new Uint8Array(buffer, 0, buffer.byteLength)]),
      mimeType
    );
    return { size: buffer.byteLength, dataUrl };
  }

  static getDataUrlFromSrcUrl(
    src: string,
    mimeType = 'image/jpeg'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = async () => {
        const result = await DataUrlHelper.toDataUrl(
          <Blob>xhr.response,
          mimeType
        );
        resolve(result);
      };
      xhr.onabort = () => reject();
      xhr.onerror = () => reject();
      xhr.open('GET', src);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  static toDataUrl(blob: Blob, mimeType: string) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(this.ensureCorrectMimeType(reader.result as string, mimeType));
      reader.onerror = () => reject();
      reader.onabort = () => reject();
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
}
