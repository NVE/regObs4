import { TestBed } from '@angular/core/testing';
import {
  DeleteFileOptions,
  FileInfo,
  FilesystemPlugin,
  MkdirOptions,
  ReaddirOptions,
  ReaddirResult,
  ReadFileOptions,
  ReadFileResult,
  RmdirOptions,
  WriteFileOptions,
  WriteFileResult,
} from '@capacitor/filesystem';
import { firstValueFrom } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import FileAttachmentService, { FILESYSTEM } from './file-attachment.service';

const DATA_URI = 'file:///data';
const ROOT_URI = `${DATA_URI}/attachments`;

/**
 * Enkel falsk filsystem-modell: holder styr på mapper og filer,
 * og oppfører seg som Capacitor Filesystem på iOS/Android når mappa allerede finnes.
 */
class FakeFolders {
  readonly folders = new Set<string>();
  readonly files = new Map<string, string>();

  private parentOf = (path: string) => path.substring(0, path.lastIndexOf('/'));
  private nameOf = (path: string) => path.substring(path.lastIndexOf('/') + 1);

  readdir = async (options: ReaddirOptions): Promise<ReaddirResult> => {
    // gi andre kall sjansen til å komme inn mellom readdir og mkdir, slik det skjer på telefonen
    await Promise.resolve();
    const parent = options.path === '' ? DATA_URI : options.path;
    const entries: { path: string; type: FileInfo['type'] }[] = [
      ...[...this.folders]
        .filter((f) => this.parentOf(f) === parent)
        .map((f) => ({ path: f, type: 'directory' as const })),
      ...[...this.files.keys()]
        .filter((f) => this.parentOf(f) === parent)
        .map((f) => ({ path: f, type: 'file' as const })),
    ];
    return {
      files: entries.map(({ path, type }) => ({ name: this.nameOf(path), type, size: 0, mtime: 0, uri: path })),
    };
  };

  mkdir = async (options: MkdirOptions): Promise<void> => {
    await Promise.resolve();
    const path = options.directory ? `${DATA_URI}/${options.path}` : options.path;
    if (this.folders.has(path)) {
      throw Object.assign(new Error(`Directory at '${path}' already exists, cannot be overwritten.`), {
        code: 'OS-PLUG-FILE-0010',
      });
    }
    this.folders.add(path);
  };

  writeFile = async (options: WriteFileOptions): Promise<WriteFileResult> => {
    this.files.set(options.path, options.data as string);
    return { uri: options.path };
  };

  readFile = async (options: ReadFileOptions): Promise<ReadFileResult> => {
    const data = this.files.get(options.path);
    if (data === undefined) {
      throw new Error(`File does not exist: ${options.path}`);
    }
    return { data };
  };

  deleteFile = async (options: DeleteFileOptions): Promise<void> => {
    if (!this.files.delete(options.path)) {
      throw new Error(`File does not exist: ${options.path}`);
    }
  };

  rmdir = async (options: RmdirOptions): Promise<void> => {
    if (!this.folders.delete(options.path)) {
      throw new Error(`Directory does not exist: ${options.path}`);
    }
  };
}

const createMeta = (id: string): AttachmentUploadEditModel => ({
  id,
  GeoHazardTID: GeoHazard.Snow,
  RegistrationTID: RegistrationTid.DangerObs,
  AttachmentMimeType: 'image/jpeg',
  type: 'Attachment',
  fileName: `${id}.jpg`,
});

describe('FileAttachmentService', () => {
  let service: FileAttachmentService;
  let logger: jasmine.SpyObj<LoggingService>;
  let fakeFolders: FakeFolders;
  let readdirSpy: jasmine.Spy;
  let mkdirSpy: jasmine.Spy;
  let writeFileSpy: jasmine.Spy;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggingService', ['debug', 'error', 'log']);
    fakeFolders = new FakeFolders();
    const filesystem = jasmine.createSpyObj<FilesystemPlugin>('Filesystem', [
      'readdir',
      'mkdir',
      'getUri',
      'writeFile',
      'readFile',
      'deleteFile',
      'rmdir',
    ]);
    readdirSpy = filesystem.readdir.and.callFake(fakeFolders.readdir);
    mkdirSpy = filesystem.mkdir.and.callFake(fakeFolders.mkdir);
    filesystem.getUri.and.callFake(async ({ path }) => ({ uri: `${DATA_URI}/${path}` }));
    writeFileSpy = filesystem.writeFile.and.callFake(fakeFolders.writeFile);
    filesystem.readFile.and.callFake(fakeFolders.readFile);
    filesystem.deleteFile.and.callFake(fakeFolders.deleteFile);
    filesystem.rmdir.and.callFake(fakeFolders.rmdir);

    TestBed.configureTestingModule({
      providers: [
        FileAttachmentService,
        { provide: LoggingService, useValue: logger },
        { provide: FILESYSTEM, useValue: filesystem },
      ],
    });
    service = TestBed.inject(FileAttachmentService);
  });

  it('creates the root folder only once when attachments are saved simultaneously', async () => {
    await Promise.all([
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-2', createMeta('b'))),
    ]);

    const rootMkdirCalls = mkdirSpy.calls.allArgs().filter(([options]) => options.path === 'attachments');
    expect(rootMkdirCalls.length).toBe(1);
    expect(writeFileSpy).toHaveBeenCalledTimes(2);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('creates the registration folder only once when attachments are saved simultaneously', async () => {
    await Promise.all([
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('b'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('c'))),
    ]);

    const registrationMkdirCalls = mkdirSpy.calls.allArgs().filter(([options]) => options.path === `${ROOT_URI}/reg-1`);
    expect(registrationMkdirCalls.length).toBe(1);
    expect(writeFileSpy).toHaveBeenCalledTimes(3);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('treats folders that already exist as created, even if readdir did not list them', async () => {
    fakeFolders.folders.add(ROOT_URI);
    fakeFolders.folders.add(`${ROOT_URI}/reg-1`);
    readdirSpy.and.resolveTo({ files: [] }); // f.eks. utdatert liste, eller mappa ble opprettet av noen andre

    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeResolved();

    expect(writeFileSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ path: `${ROOT_URI}/reg-1/a.json` }));
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('logs and rethrows other errors when creating the root folder, and tries again on the next call', async () => {
    const ioError = new Error("'mkdir' failed: unknown error");
    mkdirSpy.and.rejectWith(ioError);

    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeRejectedWith(ioError);
    expect(logger.error).toHaveBeenCalledWith(ioError, jasmine.any(String), jasmine.any(String));

    mkdirSpy.and.callFake(fakeFolders.mkdir);
    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeResolved();
    expect(writeFileSpy).toHaveBeenCalledTimes(1);
  });

  it('logs other errors when creating the registration folder, and still returns the folder path', async () => {
    fakeFolders.folders.add(ROOT_URI);
    const ioError = new Error("'mkdir' failed: unknown error");
    mkdirSpy.and.rejectWith(ioError);

    await firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')));

    expect(logger.error).toHaveBeenCalledWith(ioError, jasmine.any(String), jasmine.any(String));
    expect(writeFileSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ path: `${ROOT_URI}/reg-1/a.json` }));
  });

  it('removes an attachment from the same filesystem it was saved to', async () => {
    await firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')));
    await firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('b')));
    fakeFolders.files.set(`${ROOT_URI}/reg-1/a.jpg`, 'image');

    const removed = await firstValueFrom(service.removeAttachment$('reg-1', 'a'));

    expect(removed).toBeTrue();
    expect(fakeFolders.files.has(`${ROOT_URI}/reg-1/a.json`)).toBeFalse();
    expect(fakeFolders.files.has(`${ROOT_URI}/reg-1/a.jpg`)).toBeFalse();
    expect(fakeFolders.files.has(`${ROOT_URI}/reg-1/b.json`)).toBeTrue();
    expect(fakeFolders.folders.has(`${ROOT_URI}/reg-1`)).toBeTrue();
  });

  it('removes the registration folder when its last attachment is removed', async () => {
    await firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')));

    await firstValueFrom(service.removeAttachment$('reg-1', 'a'));

    expect(fakeFolders.files.size).toBe(0);
    expect(fakeFolders.folders.has(`${ROOT_URI}/reg-1`)).toBeFalse();
    expect(fakeFolders.folders.has(ROOT_URI)).toBeTrue();
  });

  it('returns false instead of throwing when the root folder cannot be read during removal', async () => {
    const ioError = new Error("'mkdir' failed: unknown error");
    mkdirSpy.and.rejectWith(ioError);

    const removed = await firstValueFrom(service.removeAttachment$('reg-1', 'a'));

    expect(removed).toBeFalse();
    expect(logger.error).toHaveBeenCalledWith(ioError, jasmine.any(String), jasmine.any(String));
  });
});
