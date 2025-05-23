/**
 * Based on https://github.com/SmartMoveSystems/ionicLogFileAppender
 * SmartMove Ionic rolling log file appender
 * CellTrack Systems Pty Ltd 2018
 *
 * MIT License
 *
 * Copyright (c) 2019 SmartMove Systems
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { formatDate } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import _ from 'lodash';
import { ILogProviderConfig } from './file-logging.config';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { EmailComposerService } from '../email-composer/email-composer.service';
import { settings } from 'src/settings';
import { LogLevel } from './log-level.model';
import version from '../../../../../environments/version.json';
import { Device } from '@capacitor/device';
import { getCircularReplacer } from 'src/app/core/helpers/circular-replacer';
import { Directory, Encoding, FileInfo, Filesystem } from '@capacitor/filesystem';
import { deleteFile, doesFileOrDirectoryExist, getUri } from 'src/app/utils/file-utils';

@Injectable({
  providedIn: 'root',
})
/** Lagrer debug-logg til fil på telefon. NB! Vi logger kun til fil i produksjonsbygg */
export class FileLoggingService {
  private platform = inject(Platform);
  private emailComposer = inject(EmailComposer);
  private emailComposerService = inject(EmailComposerService);

  private fileLoggerReady = false;
  private initFailed = false;
  private currentFilePath?: string;
  private lines = 0;
  private queue: string[] = [];
  private processing = false;
  private logDirPath = '';

  private readonly defaultConfig: LogProviderConfig;

  private config: LogProviderConfig;

  constructor() {
    this.defaultConfig = new LogProviderConfig({
      enableMetaLogging: false,
      logToConsole: false,
      logDateFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
      fileDateFormat: 'yyyy-MM-dd_HH-mm-ss',
      fileMaxLines: 2000,
      fileMaxSize: 1000000,
      totalLogSize: 5000000,
      baseDir: Directory.Cache,
      logDir: 'logs',
      logPrefix: 'regobs',
      devMode: false,
    });
    this.config = this.defaultConfig;
  }

  /**
   * Initializes the file logger
   */
  async init(configuration: ILogProviderConfig) {
    return this.platform.ready().then(() => {
      this.config = new LogProviderConfig(configuration);
      // Any configuration not specified will take the defaults
      this.config.merge(this.defaultConfig);
      if (!this.config.baseDir) {
        if (this.platform.is('hybrid')) {
          // Can only initialize this after platform is ready
          this.config.baseDir = Directory.Cache;
        } else {
          this.debug_metaLog('FileLoggingService: No baseDirectory set');
        }
      }
      this.debug_metaLog('LogProvider initialized with configuration: ' + JSON.stringify(this.config));
      this.fileLoggerReady = false;
      this.debug_metaLog('Initializing file logger');
      this.log('Initializing file logger');
      if (!this.platform.is('hybrid')) {
        this.debug_metaLog(
          'Not initialising file logger as the it is not supported by the platform ' + this.platform.url()
        );
        this.initFailed = true;
        return Promise.resolve();
      }
      this.debug_metaLog('Data directory: ' + this.config.baseDir);
      this.logVersionAndDeviceInfo();
      return getUri(this.config.logDir, this.config.baseDir).then((logPath) => {
        this.logDirPath = logPath;
        return doesFileOrDirectoryExist(logPath)
          .then((exist) => {
            if (exist) {
              this.debug_metaLog('Logging directory already exists');
              return this.initLogFile();
            } else {
              return this.createLogDir();
            }
          })
          .catch((err) => {
            this.debug_metaLog('Could not find logging directory: ' + JSON.stringify(err));
            return this.createLogDir();
          });
      });
    });
  }

  private logVersionAndDeviceInfo() {
    let deviceInfoFormatted = 'no device info available';
    Device.getInfo()
      .then((deviceInfo) => {
        if (deviceInfo) {
          deviceInfoFormatted = `manufacturer = ${deviceInfo.manufacturer}, model = ${deviceInfo.model}, os = ${deviceInfo.operatingSystem}, osVersion = ${deviceInfo.osVersion}, webViewVersion = ${deviceInfo.webViewVersion}`;
        }
      })
      .finally(() => {
        this.log(
          `Version = ${version.version}, build = ${version.buildNumber}, ${deviceInfoFormatted}`,
          undefined,
          LogLevel.Info
        );
      });
  }

  isReady(): boolean {
    return this.fileLoggerReady;
  }

  /**
   * Attempts to create the logging directory
   */
  private async createLogDir() {
    this.debug_metaLog('Attempting to create logging directory');
    return Filesystem.mkdir({
      path: this.config.logDir,
      directory: Directory.Cache,
    })
      .then(() => {
        this.debug_metaLog('Successfully created logging directory');
        this.initLogFile();
      })
      .catch((err) => {
        this.initFailed = true;
        this.debug_metaLog('Failed to create logging directory: ' + JSON.stringify(err));
      });
  }

  /**
   * Attempts to initialize the current log file
   * @returns a promise upon completion or failure
   */
  private async initLogFile() {
    this.debug_metaLog('Attempting to initialize log file');
    try {
      const readDirResult = await Filesystem.readdir({
        path: this.logDirPath,
      });
      if (readDirResult.files.length > 0) {
        this.debug_metaLog('Found existing log files');
        return this.cleanupFiles(readDirResult.files);
      } else {
        this.debug_metaLog('No existing log files found.');
        return this.cleanupCompleted(null, 0);
      }
    } catch (err) {
      this.debug_metaLog('Failed to get file list: ' + JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
  }

  /**
   * Checks the total size of log files against the configured maximum size and deletes oldest if necessary
   * @param entries the files found in the logging directory
   */
  private async cleanupFiles(entries: FileInfo[]) {
    this.debug_metaLog('Starting cleanup of ' + entries.length + ' log files');
    const logfiles = entries.filter(
      (entry) => entry.type === 'file' && entry.name && entry.name.startsWith(this.config.logPrefix)
    );
    if (logfiles.length === 0) {
      return this.cleanupCompleted(null, 0).catch((err) => {
        // Now we're well and truly buggered
        this.initFailed = true;
        throw err;
      });
    }
    entries = _.orderBy(entries, ['name'], ['asc']);
    const total = entries.length;
    let calculated = 0;
    let sizeTotal = 0;
    try {
      // Loop over entries
      for (const entry of entries) {
        const size = entry.size;
        // Calculate total size of log files
        calculated++;
        sizeTotal += size;
        this.debug_metaLog('After ' + calculated + ' files, total size is ' + sizeTotal);
        if (sizeTotal > this.config.totalLogSize) {
          this.debug_metaLog('Total log file size exceeds limit: ' + sizeTotal);
          return this.maxSizeExceeded(entries, size).catch((err) => {
            // Now we're well and truly buggered
            this.initFailed = true;
            throw err;
          });
        } else if (calculated === total) {
          this.debug_metaLog('Total log file size is ok: ' + sizeTotal);
          // Below max size, so we're ready to go
          const lastEntry = entries.length > 0 ? entries[entries.length - 1] : null;
          return this.cleanupCompleted(lastEntry, size).catch((err) => {
            // Now we're well and truly buggered
            this.initFailed = true;
            throw err;
          });
        }
      }
    } catch (failure) {
      const lastEntry = entries.length > 0 ? entries[entries.length - 1] : null;
      // Not much we can do except try to continue
      return this.cleanupCompleted(lastEntry, 0, (failure as Error)?.message).catch((err) => {
        // Now we're in real trouble
        this.initFailed = true;
        throw err;
      });
    }
  }

  /**
   * Attempts to remove one file and recursively check total size again
   * @param entries
   * @param lastEntrySize
   * @param resolve
   * @param reject
   */
  private async maxSizeExceeded(entries: FileInfo[], lastEntrySize: number) {
    return this.removeFile(entries[0])
      .then(() => {
        this.debug_metaLog('Entry successfully removed');
        // Remove oldest entry
        entries.shift();
        // Check again
        this.cleanupFiles(entries);
      })
      .catch((err) => {
        const lastEntry = entries.length > 0 ? entries[entries.length - 1] : null;
        // Not much we can do except try to continue
        this.cleanupCompleted(lastEntry, lastEntrySize, 'SEVERE ERROR: could not clean up old files. ' + err);
      });
  }

  /**
   * When file cleanup is completed, attempts to initialize config to point to current log file
   * @param lastEntry The most recent existing log file
   * @param lastEntrySize The size of the most recent existing log file
   * @param error Any error to be logged after initialization
   */
  private async cleanupCompleted(lastEntry: FileInfo | null, lastEntrySize: number, error?: string) {
    this.debug_metaLog('Log file cleanup done');
    if (lastEntry && lastEntrySize < this.config.fileMaxSize) {
      this.currentFilePath = lastEntry.uri;
      this.fileLoggerReady = true;
      if (error) {
        this.log(error);
      }
      this.debug_metaLog('File logger initialized at existing file: ' + this.currentFilePath);
      this.log('File logger initialized at existing file: ' + this.currentFilePath);
    } else {
      this.debug_metaLog('Last file nonexistent or too large. Creating new log file');
      return this.createNextFile().then(() => {
        this.fileLoggerReady = true;
        if (error) {
          this.log(error);
        }
        this.debug_metaLog('File logger initialized at new file: ' + this.currentFilePath);
        this.log('File logger initialized at new file: ' + this.currentFilePath);
      });
    }
  }

  /**
   * Attempts to remove a file
   */
  private removeFile(entry: FileInfo) {
    this.debug_metaLog('Removing file: ' + entry.uri);
    return deleteFile(entry.uri);
  }

  /**
   * Puts the message on the queue for writing to file
   * @param message
   * @param err. If true, logging is at error level
   */
  private logInternal(message: string, err?: boolean) {
    const date = new Date();
    const dateString = formatDate(date, this.config.logDateFormat, 'en-US');
    const logMessage = '[' + dateString + '] ' + message + '\r\n';
    if (this.config.logToConsole) {
      if (err) {
        console.error(logMessage);
      } else {
        console.log(logMessage);
      }
    }
    if (this.initFailed) {
      this.debug_metaLog('File logger init has failed! Message discarded');
      return;
    } else {
      // Put the message on the queue
      this.queue.push(logMessage);
      if (this.fileLoggerReady) {
        if (this.queue.length > 0 && !this.processing) {
          this.processing = true;
          this.doProcess();
        }
      } else {
        this.debug_metaLog('File logger is not ready! Message left on queue');
      }
    }
  }

  log(message?: string, error?: Error, level?: LogLevel, tag?: string, optionalParams?: { [key: string]: any }) {
    let msg = `[${level?.toUpperCase()}]${tag ? '[' + tag + ']' : ''} ${message}`;
    if (optionalParams) {
      msg += `. Params: ${this.stringify(optionalParams)}`;
    }
    if (error || (level && level == LogLevel.Error)) {
      this.err(msg, error);
    } else {
      this.logInternal(msg, false);
    }
  }

  /**
   * Developer-level logging
   * @param message
   */
  logDev(message: string) {
    if (this.config.devMode) {
      this.log('*DEBUG* ' + message);
    }
  }

  /**
   * Error-level logging with optional error object
   * @param message
   * @param error
   */
  err(message: string, error?: any) {
    this.logInternal(message, true);

    if (error == null) {
      return;
    }

    const errorTypeAndMessage = error.toString?.();
    if (errorTypeAndMessage) {
      this.logInternal(errorTypeAndMessage, true);
    }

    if (error.stack != null) {
      this.logInternal(error.stack, true);
    }
  }

  private stringify(data: { [key: string]: any }): string {
    if (data) {
      return JSON.stringify(data, getCircularReplacer());
    }
    return '';
  }

  /**
   * Writes the current logging queue to file
   */
  private doProcess() {
    this.debug_metaLog('Beginning processing loop');
    this.processQueue()
      .then(() => {
        if (this.queue.length > 0) {
          this.doProcess();
        } else {
          this.checkFileLength()
            .then(() => {
              this.processing = false;
            })
            .catch((err) => {
              this.debug_metaLog('Error checking file length: ' + JSON.stringify(err));
              this.processing = false;
            });
        }
      })
      .catch((err) => {
        this.debug_metaLog('Error processing queue: ' + err);
        this.processing = false;
      });
  }

  /**
   * Writes the oldest entry in the queue to file, then checks if file rollover is required
   */
  private async processQueue() {
    this.debug_metaLog('Processing queue of length ' + this.queue.length);
    if (!this.currentFilePath) {
      throw new Error('currentFile not initialized');
    }
    if (this.queue.length > 0) {
      const message = this.queue.shift();
      if (message) {
        try {
          await Filesystem.appendFile({
            path: this.currentFilePath,
            data: message,
            encoding: Encoding.UTF8,
          });
          this.lines++;
          this.checkFileLength();
        } catch (err) {
          this.debug_metaLog('Error writing to file: ' + err);
        }
      }
    }
  }

  /**
   * Checks the file length and creates a new file if required
   */
  private async checkFileLength() {
    if (this.lines >= this.config.fileMaxLines) {
      this.debug_metaLog('Creating new file as max number of log entries exceeded');
      return this.createNextFile();
    }
  }

  /**
   * Generates a log file name from the current time
   */
  private createLogFileName(): string {
    const date = new Date();
    const dateString = formatDate(date, this.config.fileDateFormat, 'en-US');
    return this.config.logPrefix + '.' + dateString + '.log';
  }

  /**
   * Creates the next log file and updates the local reference
   */
  private async createNextFile() {
    const fileName = this.createLogFileName();
    const filePath = `${this.logDirPath}/${fileName}`;
    this.debug_metaLog('Attempting to create file at: ' + filePath);
    try {
      const result = await Filesystem.writeFile({
        path: filePath,
        data: '',
        encoding: Encoding.UTF8,
      });
      this.lines = 0;
      this.currentFilePath = result.uri;
      this.debug_metaLog('Created new file at: ' + result.uri);
    } catch (err) {
      this.debug_metaLog('Error creating file: ' + err);
    }
  }

  /**
   * Retrieves the current list of log files in the logging directory
   */
  async getLogFiles(): Promise<FileInfo[]> {
    this.debug_metaLog('Attempting to retrieve log files');
    if (this.initFailed) {
      this.debug_metaLog("Log never initialized so can't retrieve files");
    } else {
      try {
        const result = await Filesystem.readdir({ path: this.logDirPath });
        return result.files;
      } catch (err) {
        this.debug_metaLog('Error retrieving log files: ' + JSON.stringify(err));
      }
    }
    return [];
  }

  private debug_metaLog(message: string) {
    if (this.config.enableMetaLogging) {
      console.log('**LOGGER_META**: ' + message);
    }
  }

  async sendLogsByEmail(topic = 'Varsom-app-logger', body = '') {
    const canSend = await this.emailComposerService.canSendEmail();
    if (canSend) {
      const fileEntries = await this.getLogFiles();
      const filePaths: string[] = fileEntries.map((entry) => entry.uri);
      const attachments = filePaths;
      const email: EmailComposerOptions = {
        to: settings.errorEmailAddress,
        attachments,
        subject: topic,
        body,
        isHtml: true,
      };
      this.emailComposer.open(email);
    }
  }
}

class LogProviderConfig implements ILogProviderConfig {
  // If true, logs verbose details of file logging operations to console
  enableMetaLogging!: boolean;

  // If true, all file log messages also appear in the console
  logToConsole!: boolean;

  // Date format used in log statements
  logDateFormat!: string;

  // Date format used in log file names.
  // NOTE: be careful with special characters like ':' as this can cause file system issues
  fileDateFormat!: string;

  // Maximum number of log statements before file rollover
  fileMaxLines!: number;

  // If the last log file exceeds this size on initialization, a new log file will be created
  fileMaxSize!: number;

  // If the total size of all log files exceeds this size on initialisation, oldest files will be removed
  totalLogSize!: number;

  // Name of directory to create for logs, within the baseDir
  logDir!: string;

  // Name of directory in which to create log directory
  baseDir!: Directory;

  // Prefix for log files
  logPrefix!: string;

  // Developer-level logging will appear in log files if true
  devMode!: boolean;
  [key: string]: any;
  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

  /**
   * Overrides this object's uninitialized fields with the passed parameter's fields
   * @param config
   */
  merge(config: any) {
    for (const k in config) {
      if (!(k in this)) {
        this[k] = config[k];
      }
    }
  }
}
