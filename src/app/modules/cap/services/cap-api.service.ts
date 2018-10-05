import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapFeed } from '../models/cap-feed.model';
import { Observable, bindNodeCallback, bindCallback } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Parser } from 'xml2js';
import { CapAlertWrapper } from '../models/cap-alert.model';

const knownArrayFields = ['items'];

@Injectable({
  providedIn: 'root'
})
export class CapApiService {

  constructor(private httpClient: HttpClient) {

  }

  getFeed(url: string) {
    return this.getApiCall<CapFeed>(url);
  }

  getItem(url: string) {
    return this.getApiCall<CapAlertWrapper>(url);
  }

  getApiCall<T>(url: string) {
    return this.httpClient.get(url, { responseType: 'text' })
      .pipe(switchMap((res) => this.getObservableFromXmlResult<T>(res)));
  }

  getObservableFromXmlResult<T>(xml: string): Observable<T> {
    const parser = new Parser({ explicitArray: false, ignoreAttrs: true });
    return bindNodeCallback(parser.parseString)(xml).pipe(map((val: T) => val));
  }
}
