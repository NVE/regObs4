import { Observable, from } from 'rxjs';
import { DataUrlHelper } from './data-url.helper';
import { map, switchMap } from 'rxjs/operators';
import { fromWorker } from 'observable-webworker';

export class ImageHelper {
    static getDataUrlFromImageOnLoad(img: HTMLImageElement, format = 'image/jpeg'): Promise<string> {
        return new Promise((resolve, reject) => {
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // Get raw image data
                const result = this.getDataUrlFromImage(img, format);
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            };
            img.onerror = () => reject();
        });
    }

    static getDataUrlFromImage(img: HTMLImageElement, format = 'image/jpeg', quality = 0.8): string {
        const canvas = this.getCanvasFromImage(img);
        if (!canvas) {
            return null;
        }
        // Get raw image data
        return canvas.toDataURL(format, quality);
    }

    static getBlobFromImage(el: HTMLImageElement, format = 'image/png', quality = 0.5) {
        return new Promise<Blob>((resolve, reject) => {
          const canvas = ImageHelper.getCanvasFromImage(el);
          if (canvas) {
            canvas.toBlob((blob) => resolve(blob), format, quality);
          } else {
            reject('No canvas found!');
          }
        });
      }

    static toDataUrlWithWebWorker(input$: Observable<{blob: ArrayBuffer, mimeType: string}>):
    Observable<{dataUrl: string, size: number}> {
        return fromWorker<{blob: ArrayBuffer, mimeType: string}, {dataUrl: string, size: number}>(() =>
            new Worker('../../workers/blob-to-dataurl.worker',
            { type: 'module' }),
            input$, input => [input.blob]);
    }

    static getImageDataUrlAsObservable(el: HTMLImageElement, format = 'image/png', quality = 0.5):
    Observable<{ dataUrl: string, size: number }> {
      const blobAndMimeType$ = from(this.getBlobFromImage(el, format, quality))
      .pipe(
          switchMap((b) => from(new Response(b).arrayBuffer())),
          map((b) => ({ blob: b, mimeType: format })));
      return this.toDataUrlWithWebWorker(blobAndMimeType$);
    }

    static getCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement {
        if (!img) {
            return null;
        }
        const canvas = document.createElement('canvas');
        canvas.id = img.id;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) {
            return null;
        }
        context.drawImage(img, 0, 0);
        // Get raw image data
        return canvas;
    }
}
