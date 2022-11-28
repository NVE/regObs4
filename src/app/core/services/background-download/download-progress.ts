export interface DownloadProgress {
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  progress: number;
  loaded: number;
  total?: number;
  content?: Blob;
}