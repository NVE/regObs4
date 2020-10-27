import { ObservableWorker, DoWork } from 'observable-webworker';
import { Observable, from } from 'rxjs';
import { map, concatMap, tap } from 'rxjs/operators';

@ObservableWorker()
export class OffscreenCanvasToArrayBuffer implements DoWork<{ offscreenCanvas: OffscreenCanvas, quality: number, mimeType: string },
{ arrayBuffer: ArrayBuffer, mimeType: string }> {
  public work(input$: Observable<{ offscreenCanvas: OffscreenCanvas, quality: number, mimeType: string }>)
        : Observable<{ arrayBuffer: ArrayBuffer, mimeType: string }> {
    return input$.pipe(
      tap((input) => console.log('Input to Offscreen Canvas', input)),
      concatMap((input) =>
        from(input.offscreenCanvas.convertToBlob({ quality: input.quality, type: input.mimeType }))
          .pipe(concatMap((blob) => from(new Response(blob).arrayBuffer())),
            map((arrayBuffer) => ({ arrayBuffer, mimeType: input.mimeType }))
          )));
  }
}
