import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { NanoSql } from '../../../../nanosql';
import { HttpRequest, HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfflineImageService {

  constructor(private httpClient: HttpClient) { }

  saveImage(url: string, data: Blob, type: string = 'image/jpg') {
    return nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('upsert', { url, data, type })
      .exec();
  }

  async getImageOrFallbackToUrl(url: string) {
    const result = await this.getImage(url);
    if (result) {
      return this.blobToDataURL(result.data);
    } else {
      return url;
    }
    // TODO: implement https://medium.com/ninjadevs/caching-images-ionic-ccf2f4ca8d1f
    // but cors is not enabled for images, so it will fail
    // return await this.blobToDataURL(result ? result.data : await this.downloadImage(url));
  }

  async downloadImage(url: string, type: string = 'image/jpg') {
    const headers = new HttpHeaders({ 'Content-Type': 'application/jpeg' });
    const result = await this.httpClient.get(url, {
      responseType: 'blob', headers
    }).toPromise();
    await this.saveImage(url, result, type);
    return result;

    // All these three attempts returns CORS error :(

    // const result = await window.fetch(url);
    // const blob = await result.blob();
    // await this.saveImage(url, blob, type);
    // return blob;

    // return new Promise<Blob>((resolve) => {
    //   const img = new Image;
    //   const c = document.createElement('canvas');
    //   const ctx = c.getContext('2d');
    //   const that = this;

    //   img.onload = function () {
    //     c.width = 300;     // update canvas size to match image
    //     c.height = 400;
    //     ctx.drawImage(img, 0, 0);       // draw in image
    //     c.toBlob(async (blob) => {        // get content as JPEG blob
    //       // here the image is a blob
    //       await that.saveImage(url, blob, type);
    //       resolve(blob);
    //     }, type, 0.75);
    //   };
    //   img.crossOrigin = '';              // if from different origin
    //   img.src = url;
    // });
  }

  async getImage(url: string) {
    const result = await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('select').where((item: { url: string }) => item.url === url)
      .exec() as { url: string, data: Blob, type: string }[];
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.readAsDataURL(blob);
    });
  }
}
