import { DoWork, runWorker } from 'observable-webworker';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataUrlHelper } from '../core/helpers/data-url.helper';

export class BlobToDataUrl
implements
    DoWork<
      { blob: ArrayBuffer; mimeType: string },
      { dataUrl: string; size: number }
    > {
  public work(
    input$: Observable<{ blob: ArrayBuffer; mimeType: string }>
  ): Observable<{ dataUrl: string; size: number }> {
    return input$.pipe(
      switchMap((input) =>
        from(
          DataUrlHelper.toDataUrlWithSizeFromArrayBuffer(
            input.blob,
            input.mimeType
          )
        )
      )
    );
  }
}
runWorker(BlobToDataUrl);
