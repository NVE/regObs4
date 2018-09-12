import { HttpClientService } from './http-client.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientNativeService implements HttpClientService {

    constructor(private http: HTTP) {

    }

    async get<T>(url: string, headers?: any): Promise<T> {
        const result = await this.http.get(url, {}, headers);
        const data: T = result.data;
        return data;
    }

    async post<T>(url: string, data?: any, headers?: any): Promise<T> {
        const result = await this.http.post(url, data, headers);
        const resultData: T = result.data;
        return resultData;
    }
}
