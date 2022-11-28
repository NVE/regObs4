import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * You may send and receive map zoom requests through this
 */
export class MapZoomService {
  private zoomInRequest = new Subject<void>();
  private zoomOutRequest = new Subject<void>();

  readonly zoomInRequest$ = this.zoomInRequest.asObservable();
  readonly zoomOutRequest$ = this.zoomOutRequest.asObservable();

  requestZoomIn(): void {
    this.zoomInRequest.next();
  }

  requestZoomOut(): void {
    this.zoomOutRequest.next();
  }
}