import { Injectable } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

export const ALLOWED_ATTACHMENT_FILE_TYPES =
  'image/jpeg, image/png, image/svg+xml, image/webp'; // https://www.w3schools.com/tags/att_input_accept.asp

@Injectable({
  providedIn: 'root'
})
export class DropZoneService {
  getFile(file: NgxFileDropEntry): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!file || !file.fileEntry || !file.fileEntry.isFile) {
        reject(new Error('Not a file!'));
      }
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((fe: File) => {
        if (this.isAllowedMimeType(fe.type)) {
          resolve(fe);
        } else {
          reject(new Error('Filetype not allowed!'));
        }
      });
    });
  }

  isAllowedMimeType(mimeType: string): boolean {
    return this.getAllowedTypes().indexOf(mimeType) >= 0;
  }

  getAllowedTypes(): string[] {
    return ALLOWED_ATTACHMENT_FILE_TYPES.split(',').map((t) => t.trim());
  }
}
