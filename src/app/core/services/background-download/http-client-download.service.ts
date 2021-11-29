import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { BackgroundDownloadService } from './background-download.service';
import { DownloadProgress } from './download-progress';

@Injectable()
export class HttpClientDownloadService implements BackgroundDownloadService {

  constructor(private http: HttpClient) {
  }

  download(url: string): Observable<DownloadProgress> {
    return this.http.get(url, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(scan((previous: DownloadProgress, event: HttpEvent<Blob>): DownloadProgress => {
      if (this.isHttpProgressEvent(event)) {
        return {
          progress: event.total
            ?  (event.loaded / event.total)
            : previous.progress,
          state: 'IN_PROGRESS',
          loaded: event.loaded,
          total: event.total,
          content: null
        };
      }
      if (this.isHttpResponse(event)) {
        return {
          progress: 100,
          state: 'DONE',
          total: event.body.size,
          loaded: event.body.size,
          content: event.body
        };
      }
      return previous;
    },
    {state: 'PENDING', progress: 0, loaded: 0, content: null}
    ));
  }

  private isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
  }

  private isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return event.type === HttpEventType.DownloadProgress
        || event.type === HttpEventType.UploadProgress;
  }
}