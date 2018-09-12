import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpClientWebService implements HttpClientService {

    constructor(private httpClient: HttpClient) {

    }

    async get<T>(url: string, headers?: any): Promise<T> {
        return (await this.httpClient.get<T>(url, { headers })).toPromise();
    }

    async post<T>(url: string, data?: any, headers?: any): Promise<T> {
        return (await this.httpClient.post<T>(url, data, { headers })).toPromise();
    }
}
