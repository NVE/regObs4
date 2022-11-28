import { registerPlugin } from '@capacitor/core';

export interface JobStatus {
  /** Between 0 and 1. 0 is not started, 1 is done. */
  progress: number;

  /** May be: SUCCESS, WORK_IN_PROGRESS, ERROR, UNKNOWN  */
  status: string;

  /** Ongoing (last started) task type */
  task: 'download' | 'unzip';
}

export interface DownloadAndUnzipOptions {
  /** Url of the file you like to download */
  downloadUrl: string;

  /** Example: file:///data/user/0/no.nve.regobs4/files/maps/134-72-8/steepness */
  destinationPath: string;
}

export interface JobOptions {
  /**
   * A unique ID of the download/unzip job
   */
  fileReference: number;
}

/**
 * A native plugin that can download zip files and unzip them
 */
export interface DownloadAndUnzipPlugin {
  /**
   * Start download and unzip of a specific file.
   * You may use the returned job ID to query for status or cancel the job.
   * @returns a unique ID of the download/unzip job
   */
  downloadAndUnzip(options: DownloadAndUnzipOptions): Promise<{ fileReference: number }>;

  /**
   * Stop download or unzip of a file with a specific file reference number.
   * @param a reference to the job you like to cancel
   */
  cancelJob({ fileReference: number }): Promise<void>;

  /**
   * Query about status and progress for a specific download/unzip job.
   * @param a reference to the job in question
   */
  getJobStatus({ fileReference: number }): Promise<JobStatus>;
}

export const DownloadAndUnzip = registerPlugin<DownloadAndUnzipPlugin>('DownloadAndUnzip');
