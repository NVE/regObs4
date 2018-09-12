import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpClientService {

  abstract get<T>(url: string, headers?: any): Promise<T>;
  abstract post<T>(url: string, data?: any, headers?: any): Promise<T>;
}
